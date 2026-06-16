import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';

// Campay appelle cette URL pour notifier du statut du paiement
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { external_reference, status, reference } = body;

    if (!external_reference) {
      return NextResponse.json({ error: 'Référence manquante' }, { status: 400 });
    }

    await connectDB();

    // Trouver la commande par référence externe
    const order = await Order.findOne({ paymentRef: external_reference });
    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 });
    }

    // Mettre à jour le statut selon la réponse Campay
    if (status === 'SUCCESSFUL') {
      order.status = 'en_traitement';
      order.paymentRef = reference || external_reference;
    } else if (status === 'FAILED') {
      order.status = 'annulee';
    }

    await order.save();

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur webhook' }, { status: 500 });
  }
}

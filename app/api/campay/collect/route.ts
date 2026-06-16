import { NextResponse } from 'next/server';
import { initiatePayment } from '@/lib/campay';

export async function POST(request: Request) {
  try {
    const { amount, phone, description, externalReference } = await request.json();

    if (!amount || !phone) {
      return NextResponse.json(
        { error: 'Montant et téléphone requis' },
        { status: 400 }
      );
    }

    const result = await initiatePayment({
      amount,
      phone,
      description: description || 'Commande NovaOrizon',
      externalReference: externalReference || 'NOVA-' + Date.now(),
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur Campay' },
      { status: 500 }
    );
  }
}

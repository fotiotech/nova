import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Connection from '@/lib/models/Connection';

export async function GET() {
  try {
    await connectDB();
    let settings = await Connection.findOne({ key: 'store_settings' });
    if (!settings) {
      settings = await Connection.create({
        key: 'store_settings',
        data: {
          name: 'NovaOrizon',
          currency: 'XAF',
          currencySymbol: 'FCFA',
          phone: '+237 6XX XXX XXX',
          email: 'contact@novaorizon.cm',
          address: 'Douala, Cameroun',
        },
      });
    }
    return NextResponse.json(settings.data);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const settings = await Connection.findOneAndUpdate(
      { key: 'store_settings' },
      { data },
      { upsert: true, new: true }
    );
    return NextResponse.json(settings.data);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}

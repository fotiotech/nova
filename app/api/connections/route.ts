import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Connection from '@/lib/models/Connection';

export async function GET() {
  try {
    await connectDB();
    const connections = await Connection.find({});
    const result: Record<string, any> = {};
    connections.forEach(c => { result[c.key] = c.data; });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { key, data } = body;

    const connection = await Connection.findOneAndUpdate(
      { key },
      { data },
      { upsert: true, new: true }
    );

    return NextResponse.json(connection);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}

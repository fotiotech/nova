import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  items: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    qty: number;
  }>;
  customer: {
    name: string;
    phone: string;
    city: string;
    quarter: string;
    notes?: string;
  };
  deliveryFee: number;
  total: number;
  paymentMethod: 'campay' | 'livraison';
  paymentRef?: string;
  status: 'en_attente' | 'en_traitement' | 'expediee' | 'livree' | 'annulee';
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    items: [{ id: Number, name: String, price: Number, image: String, qty: Number }],
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      quarter: { type: String, required: true },
      notes: String,
    },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['campay', 'livraison'], required: true },
    paymentRef: String,
    status: {
      type: String,
      enum: ['en_attente', 'en_traitement', 'expediee', 'livree', 'annulee'],
      default: 'en_attente',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

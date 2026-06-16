import mongoose, { Schema, Document } from 'mongoose';

export interface IConnection extends Document {
  key: string;
  data: Record<string, any>;
  updatedAt: Date;
}

const ConnectionSchema = new Schema<IConnection>(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Connection || mongoose.model<IConnection>('Connection', ConnectionSchema);

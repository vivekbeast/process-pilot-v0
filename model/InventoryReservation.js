// models/InventoryReservation.js
// optional: reserve components when MO is confirmed
import { Schema, model } from 'mongoose';
const ReservationSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  qty: Number,
  reservedFor: { type: Schema.Types.ObjectId, ref: 'ManufacturingOrder' },
  expiresAt: Date,
  status: { type: String, enum: ['active','released','consumed'], default: 'active' }
}, { timestamps: true });
export default model('InventoryReservation', ReservationSchema);
// models/ManufacturingOrder.js
import { Schema, model } from 'mongoose';
const MOSchema = new Schema({
  moNumber: { type: String, unique: true, index: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  bom: { type: Schema.Types.ObjectId, ref: 'BOM' },
  quantity: { type: Number, required: true }, // total units to produce
  producedQty: { type: Number, default: 0 },
  status: { type: String, enum: ['planned','confirmed','in_progress','done','cancelled'], default: 'planned' },
  scheduleStart: Date,
  scheduleEnd: Date,
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  workOrders: [{ type: Schema.Types.ObjectId, ref: 'WorkOrder' }],
  notes: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


export default model('ManufacturingOrder', MOSchema);
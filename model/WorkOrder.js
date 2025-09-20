// models/WorkOrder.js
import { Schema, model } from 'mongoose';
const WOSchema = new Schema({
  woNumber: { type: String, unique: true, index: true },
  mo: { type: Schema.Types.ObjectId, ref: 'ManufacturingOrder', required: true },
  operationName: String,
  sequence: Number,
  workCenter: { type: Schema.Types.ObjectId, ref: 'WorkCenter' },
  plannedDurationMinutes: Number,
  actualDurationMinutes: Number,
  plannedQty: Number, // qty units this operation applies to
  status: { type: String, enum: ['planned','ready','in_progress','paused','done','blocked'], default: 'planned' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  startedAt: Date,
  pausedAt: Date,
  completedAt: Date,
  comments: [{ by: { type: Schema.Types.ObjectId, ref: 'User' }, text: String, createdAt: Date }],
}, { timestamps: true });
export default model('WorkOrder', WOSchema);
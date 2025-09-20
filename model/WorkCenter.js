// models/WorkCenter.js
import { Schema, model } from 'mongoose';
const WorkCenterSchema = new Schema({
  name: String,
  code: { type: String, unique: true },
  location: String,
  capacityPerHour: Number,
  costPerHour: Number,
  defaultAssignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  availabilityCalendar: Schema.Types.Mixed
}, { timestamps: true });
export default model('WorkCenter', WorkCenterSchema);
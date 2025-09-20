// models/BOM.js
import { Schema, model } from 'mongoose';
const BOMSchema = new Schema({
  name: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  version: { type: String, default: '1.0' },
  items: [{
    component: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true }, // qty per 1 finished product unit
    scrapRate: { type: Number, default: 0 } // e.g., 0.02 = 2% expected scrap
  }],
  operations: [{
    name: String,
    workCenter: { type: Schema.Types.ObjectId, ref: 'WorkCenter' },
    durationMinutes: Number,
    sequence: Number
  }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

BOMSchema.index({ product: 1, version: 1 }, { unique: true });
export default model('BOM', BOMSchema);
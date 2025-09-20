// models/Product.js
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  sku: { type: String, unique: true, index: true },
  name: String,
  description: String,
  unit: String,              // e.g., 'pcs'
  productType: { type: String, enum: ['raw_material','finished_good','sub_assembly'] },
  isSellable: Boolean,
  defaultCost: Number,
  stockQty: { type: Number, default: 0 }, // denormalized for quick reads
  uom: String,
  attributes: Schema.Types.Mixed
}, { timestamps: true });
export default model('Product', ProductSchema);
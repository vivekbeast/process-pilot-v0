// models/Product.js
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  unitOfMeasure: { type: String, required: true },
  productType: { type: String, enum: ["raw_material", "finished_good", "semi_finished"], required: true },
  standardCost: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export default model('Product', ProductSchema);


import mongoose from "mongoose";
const { Schema, model } = mongoose;
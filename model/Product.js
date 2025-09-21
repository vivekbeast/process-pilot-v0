// import { Schema, model, models } from 'mongoose'; // Use 'models'

// const ProductSchema = new Schema({
//   code: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   description: String,
//   unitOfMeasure: { type: String, required: true },
//   productType: { type: String, enum: ["raw_material", "finished_good", "semi_finished"], required: true },
//   standardCost: { type: Number, required: true },
//   isActive: { type: Boolean, default: true },
// }, { timestamps: true }); // It's good practice to add timestamps

// // Use the standard Next.js pattern to prevent model recompilation errors
// const Product = models.Product || model('Product', ProductSchema);

// export default Product;

// /model/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
  type: String,
  unique: true,
  default: () => `PRD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
,
  unitOfMeasure: {
    type: String,
    required: true,
    enum: ['pcs', 'kg', 'ltr', 'sq ft', 'm', 'cm', 'gm', 'ml']
  },
  productType: {
    type: String,
    enum: ['finished', 'raw_material', 'component'],
    default: 'finished'
  },
  description: {
    type: String,
    default: ''
  },
  cost: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

ProductSchema.index({ name: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
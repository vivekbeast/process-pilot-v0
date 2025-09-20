import { Schema, model, models } from 'mongoose'; // Use 'models'

const ProductSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  unitOfMeasure: { type: String, required: true },
  productType: { type: String, enum: ["raw_material", "finished_good", "semi_finished"], required: true },
  standardCost: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true }); // It's good practice to add timestamps

// Use the standard Next.js pattern to prevent model recompilation errors
const Product = models.Product || model('Product', ProductSchema);

export default Product;
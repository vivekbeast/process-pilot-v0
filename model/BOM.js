import { Schema, model, models } from 'mongoose';

// This is a sub-document schema for each component within the BOM.
const componentSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', // This MUST match your Product model name
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  }
}, { _id: false }); // _id is not needed for sub-documents here

// Main BOM Schema
const BOMSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true // e.g., "Ergonomic Chair Recipe v1.1"
  },
  finishedGood: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Links this BOM to the specific product it creates
    required: true,
    unique: true
  },
  components: [componentSchema], // An array of raw materials and their quantities
  isActive: {
    type: Boolean,
    default: true
  },
  notes: String
}, { timestamps: true });

const BOM = models.BOM || model('BOM', BOMSchema);

export default BOM;
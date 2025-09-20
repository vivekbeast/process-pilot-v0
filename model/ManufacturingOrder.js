import { Schema, model, models } from 'mongoose';

const MOSchema = new Schema({
  moNumber: { 
    type: String, 
    unique: true, 
    index: true, 
    required: true 
  },
  product: { // CORRECTED: Renamed from 'product' to match API usage
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  bom: { 
    type: Schema.Types.ObjectId, 
    ref: 'BOM' 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  producedQty: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    // CORRECTED: 'planned' changed to 'draft' to match frontend and API logic
    enum: ['draft', 'confirmed', 'in_progress', 'to_close', 'done', 'cancelled'], 
    default: 'draft' 
  },
  componentStatus: { // Added field to track component availability
    type: String,
    enum: ['Available', 'Not Available', 'Partially Available'],
    default: 'Not Available'
  },
  scheduleStart: Date,
  scheduleEnd: Date,
  // ... other fields are fine
}, { timestamps: true });

// /**
//  * Static method to generate next unique MO number
//  * Uses a counter collection to avoid duplicates under concurrency
//  */
MOSchema.statics.generateMONumber = async function() {
  const Counter = models.Counter || model("Counter", new Schema({
    _id: String,
    seq: { type: Number, default: 0 }
  }));

  const counter = await Counter.findByIdAndUpdate(
    { _id: "manufacturingOrder" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const nextSeq = counter.seq;
  return `MO-${String(nextSeq).padStart(6, "0")}`;
};

const ManufacturingOrder = models.ManufacturingOrder || model('ManufacturingOrder', MOSchema);
export default ManufacturingOrder;
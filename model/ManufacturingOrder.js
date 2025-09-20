// // models/ManufacturingOrder.js
// import { Schema, model } from 'mongoose';
// const MOSchema = new Schema({
//   moNumber: { type: String, unique: true, index: true },
//   product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//   bom: { type: Schema.Types.ObjectId, ref: 'BOM' },
//   quantity: { type: Number, required: true }, // total units to produce
//   producedQty: { type: Number, default: 0 },
//   status: { type: String, enum: ['planned','confirmed','in_progress','done','cancelled'], default: 'planned' },
//   scheduleStart: Date,
//   scheduleEnd: Date,
//   assignee: { type: Schema.Types.ObjectId, ref: 'User' },
//   workOrders: [{ type: Schema.Types.ObjectId, ref: 'WorkOrder' }],
//   notes: String,
//   createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
// }, { timestamps: true });


// export default model('ManufacturingOrder', MOSchema);

// models/ManufacturingOrder.js
import { Schema, model, models } from 'mongoose';

// Manufacturing Order Schema
const MOSchema = new Schema({
  moNumber: { 
    type: String, 
    unique: true, 
    index: true, 
    required: true 
  },

  product: { 
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
  }, // total units to produce

  producedQty: { 
    type: Number, 
    default: 0 
  },

  status: { 
    type: String, 
    enum: ['planned', 'confirmed', 'in_progress', 'done', 'cancelled'], 
    default: 'planned' 
  },

  scheduleStart: Date,
  scheduleEnd: Date,

  assignee: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },

  workOrders: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'WorkOrder' 
  }],

  notes: String,

  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

/**
 * Static method to generate next unique MO number
 * Uses a counter collection to avoid duplicates under concurrency
 */
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

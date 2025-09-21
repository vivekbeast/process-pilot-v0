// // import { Schema, model, models } from 'mongoose';

// // // This is a sub-document schema for each component within the BOM.
// // const componentSchema = new Schema({
// //   product: { 
// //     type: Schema.Types.ObjectId, 
// //     ref: 'Product', // This MUST match your Product model name
// //     required: true 
// //   },
// //   quantity: { 
// //     type: Number, 
// //     required: true 
// //   }
// // }, { _id: false }); // _id is not needed for sub-documents here

// // // Main BOM Schema
// // const BOMSchema = new Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //     unique: true // e.g., "Ergonomic Chair Recipe v1.1"
// //   },
// //   finishedGood: {
// //     type: Schema.Types.ObjectId,
// //     ref: 'Product', // Links this BOM to the specific product it creates
// //     required: true,
// //     unique: true
// //   },
// //   components: [componentSchema], // An array of raw materials and their quantities
// //   isActive: {
// //     type: Boolean,
// //     default: true
// //   },
// //   notes: String
// // }, { timestamps: true });

// // const BOM = models.BOM || model('BOM', BOMSchema);

// // export default BOM;
// // /model/BOM.js
// // import mongoose from 'mongoose';

// // const BOMComponentSchema = new mongoose.Schema({
// //   product: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Product',
// //     required: true
// //   },
// //   quantity: {
// //     type: Number,
// //     required: true,
// //     min: 0.001
// //   }
// // }, { _id: false });

// // const BOMSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   product: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Product',
// //     required: true
// //   },
// //   components: [BOMComponentSchema],
// //   isActive: {
// //     type: Boolean,
// //     default: true
// //   },
// //   version: {
// //     type: String,
// //     default: '1.0'
// //   }
// // }, {
// //   timestamps: true
// // });

// // BOMSchema.index({ product: 1 });
// // BOMSchema.index({ name: 1 });

// // export default mongoose.models.BOM || mongoose.model('BOM', BOMSchema);

// import mongoose from 'mongoose';

// const OperationSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   workCenter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'WorkCenter',
//     required: true,
//   },
//   duration: { // Expected duration in minutes
//     type: Number,
//     required: true,
//     min: 0,
//     default: 0,
//   },
// });

// const BOMSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'BOM name is required.'],
//     unique: true,
//     trim: true,
//   },
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   components: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 0.0001,
//     },
//   }],
//   // --- NEWLY ADDED ---
//   // This array defines the manufacturing steps (Routing)
//   operations: [OperationSchema],
//   isActive: {
//     type: Boolean,
//     default: true,
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.models.BOM || mongoose.model('BOM', BOMSchema);
// /model/BOM.js
import mongoose from 'mongoose';

const bomComponentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unitOfMeasure: {
    type: String,
    default: 'pcs'
  },
  scrapPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  notes: String
});

const bomOperationSchema = new mongoose.Schema({
  sequenceNumber: {
    type: Number,
    required: true,
    min: 1
  },
  operationName: {
    type: String,
    required: true
  },
  workCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkCenter',
    required: false // Make it optional to avoid issues
  },
  description: String,
  instructions: String,
  
  // Timing
  setupTime: {
    type: Number, // in minutes
    default: 0,
    min: 0
  },
  cycleTime: {
    type: Number, // in minutes per unit
    default: 1,
    min: 0.01
  },
  
  // Quality requirements
  qualityChecks: [{
    checkPoint: String,
    specification: String,
    tolerance: String,
    method: String
  }],
  
  // Resource requirements
  requiredSkills: [String],
  toolsRequired: [String],
  
  // Costing
  laborRate: {
    type: Number,
    default: 0
  },
  overheadRate: {
    type: Number,
    default: 0
  }
});

const bomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  version: {
    type: String,
    default: '1.0'
  },
  finishedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'obsolete'],
    default: 'draft'
  },
  
  // Components (materials)
  components: [bomComponentSchema],
  
  // Operations (routing)
  operations: [bomOperationSchema],
  
  // General information
  description: String,
  notes: String,
  
  // Costing summary
  totalMaterialCost: {
    type: Number,
    default: 0
  },
  totalLaborCost: {
    type: Number,
    default: 0
  },
  totalOverheadCost: {
    type: Number,
    default: 0
  },
  
  // Timing summary
  totalSetupTime: {
    type: Number,
    default: 0
  },
  totalCycleTime: {
    type: Number,
    default: 0
  },
  
  // Metadata
  createdBy: {
    type: String,
    default: 'System'
  },
  approvedBy: String,
  approvedDate: Date,
  effectiveDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
bomSchema.index({ finishedProduct: 1, version: 1 });
bomSchema.index({ name: 1, status: 1 });
bomSchema.index({ status: 1, effectiveDate: 1 });

// Virtual for total manufacturing time per unit
bomSchema.virtual('totalManufacturingTime').get(function() {
  const totalSetup = this.operations.reduce((sum, op) => sum + (op.setupTime || 0), 0);
  const totalCycle = this.operations.reduce((sum, op) => sum + (op.cycleTime || 0), 0);
  return totalSetup + totalCycle;
});

// Virtual for total estimated cost
bomSchema.virtual('totalEstimatedCost').get(function() {
  return this.totalMaterialCost + this.totalLaborCost + this.totalOverheadCost;
});

// Methods
bomSchema.methods.calculateMaterialCost = async function() {
  let totalCost = 0;
  
  for (const component of this.components) {
    if (component.product && component.product.standardCost) {
      const componentCost = component.quantity * component.product.standardCost;
      const scrapCost = componentCost * (component.scrapPercentage / 100);
      totalCost += componentCost + scrapCost;
    }
  }
  
  this.totalMaterialCost = totalCost;
  return totalCost;
};

bomSchema.methods.calculateLaborCost = function() {
  let totalLaborCost = 0;
  
  for (const operation of this.operations) {
    if (operation.workCenter && operation.workCenter.costPerHour) {
      const setupCost = (operation.setupTime / 60) * operation.workCenter.costPerHour;
      const cycleCost = (operation.cycleTime / 60) * operation.workCenter.costPerHour;
      totalLaborCost += setupCost + cycleCost;
    }
  }
  
  this.totalLaborCost = totalLaborCost;
  return totalLaborCost;
};

bomSchema.methods.calculateOverheadCost = function() {
  // Simple overhead calculation based on labor cost
  const overheadRate = 0.5; // 50% of labor cost
  this.totalOverheadCost = this.totalLaborCost * overheadRate;
  return this.totalOverheadCost;
};

bomSchema.methods.calculateAllCosts = async function() {
  await this.calculateMaterialCost();
  this.calculateLaborCost();
  this.calculateOverheadCost();
  
  return {
    materialCost: this.totalMaterialCost,
    laborCost: this.totalLaborCost,
    overheadCost: this.totalOverheadCost,
    totalCost: this.totalEstimatedCost
  };
};

bomSchema.methods.validateOperationSequence = function() {
  const sequences = this.operations.map(op => op.sequenceNumber).sort((a, b) => a - b);
  
  for (let i = 0; i < sequences.length; i++) {
    if (sequences[i] !== i + 1) {
      return false;
    }
  }
  return true;
};

bomSchema.methods.getOperationBySequence = function(sequenceNumber) {
  return this.operations.find(op => op.sequenceNumber === sequenceNumber);
};

bomSchema.methods.getTotalManufacturingTime = function(quantity = 1) {
  let totalTime = 0;
  
  for (const operation of this.operations) {
    totalTime += (operation.setupTime || 0) + ((operation.cycleTime || 0) * quantity);
  }
  
  return totalTime;
};

bomSchema.methods.activate = function(approvedBy) {
  this.status = 'active';
  this.approvedBy = approvedBy;
  this.approvedDate = new Date();
  return this.save();
};

bomSchema.methods.deactivate = function() {
  this.status = 'inactive';
  return this.save();
};

// Static methods
bomSchema.statics.findActiveBOMs = function() {
  return this.find({ status: 'active', isActive: true })
    .populate('finishedProduct', 'name unitOfMeasure')
    .populate('components.product', 'name unitOfMeasure standardCost')
    .populate('operations.workCenter', 'name code costPerHour');
};

bomSchema.statics.findByProduct = function(productId) {
  return this.find({ 
    finishedProduct: productId, 
    status: 'active', 
    isActive: true 
  })
    .populate('components.product', 'name unitOfMeasure standardCost')
    .populate('operations.workCenter', 'name code costPerHour')
    .sort({ version: -1 });
};

bomSchema.statics.getLatestVersion = function(productId) {
  return this.findOne({ 
    finishedProduct: productId, 
    status: 'active', 
    isActive: true 
  })
    .populate('components.product', 'name unitOfMeasure standardCost')
    .populate('operations.workCenter', 'name code costPerHour')
    .sort({ version: -1 });
};

// Pre-save middleware
bomSchema.pre('save', function(next) {
  // Sort operations by sequence number
  if (this.operations && this.operations.length > 0) {
    this.operations.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
    
    // Calculate timing summaries
    this.totalSetupTime = this.operations.reduce((sum, op) => sum + (op.setupTime || 0), 0);
    this.totalCycleTime = this.operations.reduce((sum, op) => sum + (op.cycleTime || 0), 0);
  }
  
  next();
});

// Post-save middleware to update costs
bomSchema.post('save', async function(doc) {
  if (doc.isModified('components') || doc.isModified('operations')) {
    try {
      await doc.calculateAllCosts();
      if (doc.isModified()) {
        await doc.save();
      }
    } catch (error) {
      console.error('Error calculating BOM costs:', error);
    }
  }
});

// Ensure virtual fields are serialized
bomSchema.set('toJSON', { virtuals: true });
bomSchema.set('toObject', { virtuals: true });

const BOM = mongoose.models.BOM || mongoose.model('BOM', bomSchema);

export default BOM;
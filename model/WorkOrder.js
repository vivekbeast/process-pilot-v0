import mongoose from 'mongoose';

const workOrderSchema = new mongoose.Schema({
  // Basic Information
  moNumber: {
    type: String,
    required: true,
    index: true
  },
  operationName: {
    type: String,
    required: true
  },
  workCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkCenter',
    required: true
  },
  
  // Status and Sequence
  status: {
    type: String,
    enum: ['draft', 'ready', 'in_progress', 'completed', 'cancelled', 'on_hold'],
    default: 'draft'
  },
  sequence: {
    type: Number,
    required: true,
    default: 1
  },
  sequenceNumber: {
    type: Number,
    default: 1
  },
  
  // Timing Information
  expectedDuration: {
    type: Number, // in minutes
    default: 0
  },
  actualDuration: {
    type: Number, // in minutes
    default: 0
  },
  setupTime: {
    type: Number, // in minutes
    default: 0
  },
  cycleTime: {
    type: Number, // in minutes per unit
    default: 0
  },
  
  // Dates
  plannedStartDate: {
    type: Date
  },
  plannedEndDate: {
    type: Date
  },
  actualStartDate: {
    type: Date
  },
  actualEndDate: {
    type: Date
  },
  
  // Quantity Information
  quantityToProduce: {
    type: Number,
    required: true,
    default: 1
  },
  quantityProduced: {
    type: Number,
    default: 0
  },
  quantityScrap: {
    type: Number,
    default: 0
  },
  
  // Cost Information
  estimatedCost: {
    type: Number,
    default: 0
  },
  actualCost: {
    type: Number,
    default: 0
  },
  
  // Additional Information
  description: {
    type: String
  },
  instructions: {
    type: String
  },
  notes: {
    type: String
  },
  
  // Quality Information
  qualityChecks: [{
    checkPoint: String,
    status: {
      type: String,
      enum: ['pending', 'pass', 'fail', 'rework']
    },
    checkedBy: String,
    checkedAt: Date,
    notes: String
  }],
  
  // Resource Requirements
  requiredSkills: [String],
  assignedOperator: {
    type: String
  },
  
  // Dependencies
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder'
  }],
  
  // Tracking
  createdBy: {
    type: String,
    default: 'System'
  },
  lastUpdatedBy: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better performance
workOrderSchema.index({ moNumber: 1, sequence: 1 }); // Use 'sequence' instead of 'sequenceNumber'
workOrderSchema.index({ workCenter: 1, status: 1 });
workOrderSchema.index({ status: 1, plannedStartDate: 1 });

// Virtual for completion percentage
workOrderSchema.virtual('completionPercentage').get(function() {
  if (this.quantityToProduce === 0) return 0;
  return Math.round((this.quantityProduced / this.quantityToProduce) * 100);
});

// Virtual for efficiency calculation
workOrderSchema.virtual('efficiency').get(function() {
  if (!this.expectedDuration || this.expectedDuration === 0 || !this.actualDuration) return null;
  return Math.round((this.expectedDuration / this.actualDuration) * 100);
});

// Virtual for total duration including setup
workOrderSchema.virtual('totalPlannedDuration').get(function() {
  return this.setupTime + (this.cycleTime * this.quantityToProduce);
});

// Methods
workOrderSchema.methods.canStart = function() {
  return this.status === 'draft' || this.status === 'ready';
};

workOrderSchema.methods.canComplete = function() {
  return this.status === 'in_progress';
};

workOrderSchema.methods.startWork = function(operatorId) {
  if (!this.canStart()) {
    throw new Error('Work order cannot be started in current status');
  }
  
  this.status = 'in_progress';
  this.actualStartDate = new Date();
  if (operatorId) {
    this.assignedOperator = operatorId;
  }
  this.lastUpdatedBy = operatorId || 'System';
  
  return this.save();
};

workOrderSchema.methods.completeWork = function(producedQty, scrapQty = 0, operatorId) {
  if (!this.canComplete()) {
    throw new Error('Work order cannot be completed in current status');
  }
  
  this.status = 'completed';
  this.actualEndDate = new Date();
  this.quantityProduced = producedQty || this.quantityToProduce;
  this.quantityScrap = scrapQty;
  
  // Calculate actual duration
  if (this.actualStartDate) {
    this.actualDuration = Math.round((this.actualEndDate - this.actualStartDate) / (1000 * 60));
  }
  
  this.lastUpdatedBy = operatorId || 'System';
  
  return this.save();
};

workOrderSchema.methods.putOnHold = function(reason, operatorId) {
  this.status = 'on_hold';
  this.notes = (this.notes ? this.notes + '\n' : '') + `Put on hold: ${reason}`;
  this.lastUpdatedBy = operatorId || 'System';
  
  return this.save();
};

workOrderSchema.methods.calculateActualCost = function() {
  if (this.actualDuration && this.workCenter && this.workCenter.costPerHour) {
    this.actualCost = (this.actualDuration / 60) * this.workCenter.costPerHour;
  }
  return this.actualCost;
};

// Static methods
workOrderSchema.statics.findByMO = function(moNumber) {
  return this.find({ moNumber })
    .populate('workCenter', 'name code costPerHour')
    .sort({ sequence: 1 }); // Use 'sequence' instead of 'sequenceNumber'
};

workOrderSchema.statics.findReadyToStart = function() {
  return this.find({ status: 'ready' })
    .populate('workCenter', 'name code')
    .sort({ plannedStartDate: 1 });
};

workOrderSchema.statics.findInProgress = function() {
  return this.find({ status: 'in_progress' })
    .populate('workCenter', 'name code')
    .sort({ actualStartDate: 1 });
};

workOrderSchema.statics.getWorkCenterWorkload = function(workCenterId, startDate, endDate) {
  const matchConditions = {
    workCenter: workCenterId,
    status: { $nin: ['completed', 'cancelled'] }
  };
  
  if (startDate && endDate) {
    matchConditions.$or = [
      { plannedStartDate: { $gte: startDate, $lte: endDate } },
      { plannedEndDate: { $gte: startDate, $lte: endDate } }
    ];
  }
  
  return this.find(matchConditions)
    .populate('workCenter', 'name code capacity')
    .sort({ plannedStartDate: 1 });
};

// Pre-save middleware
workOrderSchema.pre('save', function(next) {
  // Auto-calculate planned end date if not set
  if (this.plannedStartDate && this.expectedDuration && !this.plannedEndDate) {
    this.plannedEndDate = new Date(this.plannedStartDate.getTime() + (this.expectedDuration * 60 * 1000));
  }
  
  // Update actual cost if work is completed
  if (this.status === 'completed' && this.actualDuration) {
    this.calculateActualCost();
  }
  
  next();
});

// Ensure virtual fields are serialized
workOrderSchema.set('toJSON', { virtuals: true });
workOrderSchema.set('toObject', { virtuals: true });
delete mongoose.models.WorkOrder;

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

export default WorkOrder;
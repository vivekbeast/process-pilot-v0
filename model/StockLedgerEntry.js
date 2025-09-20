// import { Schema, model, models } from 'mongoose';

// /**
//  * Stock Ledger Schema
//  *
//  * This schema tracks the real-time inventory levels for every product,
//  * both raw materials and finished goods. It is the single source of truth
//  * for inventory quantities.
//  */
// const StockLedgerSchema = new Schema({
//   /**
//    * A direct link to the product this stock record represents.
//    * This is a required field and creates a one-to-one relationship
//    * between a product and its inventory record.
//    */
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: 'Product', // This MUST match the model name you use for your products
//     required: true,
//     unique: true, // Ensures only one stock record per product
//     index: true,
//   },

//   /**
//    * The total physical quantity of the item currently in the warehouse.
//    * This is the "On Hand" value in your UI.
//    * This value decreases ONLY when an order is completed/shipped.
//    */
//   quantityOnHand: {
//     type: Number,
//     required: true,
//     default: 0,
//     min: 0, // Stock cannot be negative
//   },

//   /**
//    * The quantity of the item that has been committed to confirmed
//    * manufacturing orders but has not yet been physically used.
//    * This is the "Outgoing" value in your UI.
//    * This value increases when a Manufacturing Order is 'confirmed'
//    * and decreases when it is 'done' or 'cancelled'.
//    */
//   quantityReserved: {
//     type: Number,
//     required: true,
//     default: 0,
//     min: 0,
//   },

//   /**
//    * A virtual property to calculate the "Free to Use" quantity.
//    * This is not stored in the database but is calculated on the fly.
//    * Free to Use = On Hand - Reserved
//    * This helps determine if you can fulfill a new order.
//    */
//   // Note: Virtuals are defined after the schema is created. See below.

// }, {
//   timestamps: true, // Automatically adds createdAt and updatedAt fields
//   toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
//   toObject: { virtuals: true }
// });

// // Define the virtual property for 'freeToUse'
// StockLedgerSchema.virtual('freeToUse').get(function() {
//   return this.quantityOnHand - this.quantityReserved;
// });


// const StockLedger = models.StockLedger || model('StockLedger', StockLedgerSchema);

// export default StockLedger;
// /model/StockLedger.js
import mongoose from 'mongoose';

const StockLedgerSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantityOnHand: {
    type: Number,
    default: 0,
    min: 0
  },
  quantityReserved: {
    type: Number,
    default: 0,
    min: 0
  },
  quantityAvailable: {
    type: Number,
    default: 0,
    min: 0
  },
  averageCost: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    default: 'MAIN-WAREHOUSE'
  },
  lastMovementDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual field for available quantity
StockLedgerSchema.virtual('availableQuantity').get(function() {
  return this.quantityOnHand - this.quantityReserved;
});

// Update quantityAvailable before saving
StockLedgerSchema.pre('save', function(next) {
  this.quantityAvailable = this.quantityOnHand - this.quantityReserved;
  next();
});

StockLedgerSchema.index({ product: 1 }, { unique: true });
StockLedgerSchema.index({ location: 1 });

export default mongoose.models.StockLedger || mongoose.model('StockLedger', StockLedgerSchema);
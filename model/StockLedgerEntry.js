// models/StockLedgerEntry.js
import { Schema, model } from 'mongoose';
const StockLedgerSchema = new Schema({
  txnId: { type: String, index: true }, // e.g., MO-<id>-consume or WO-<id>-produce
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  changeQty: Number, // positive for in, negative for out
  availableQtyAfter: Number,
  type: { type: String, enum: ['consume','produce','adjustment','transfer','opening'] },
  reference: { refCollection: String, refId: Schema.Types.ObjectId },
  reason: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  metadata: Schema.Types.Mixed
}, { timestamps: true });
export default model('StockLedgerEntry', StockLedgerSchema);
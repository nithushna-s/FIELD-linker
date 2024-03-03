const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  paymentIntentId: {
    type: String,
    required: true,
  },
  landId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  InvoiceId: {
    type: String,
    required: true,
    unique: true,
  },
} , {
  timestamps: true 
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

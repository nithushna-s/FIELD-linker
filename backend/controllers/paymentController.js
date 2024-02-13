const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Invoice = require('../models/Invoice');
const uuid = require('uuid');

// Function to generate a unique invoice ID
const generateInvoiceId = () => {
  return uuid.v4();
};
const createPayment = async (req, res) => {
    try {
      const { paymentMethodId, cardholderName, paymentAmount } = req.body;
  
      // Find the maximum InvoiceId value
      const maxInvoice = await Invoice.findOne({}, {}, { sort: { InvoiceId: -1 } });
      let nextInvoiceId = 1;
      if (maxInvoice) {
        nextInvoiceId = maxInvoice.InvoiceId + 1;
      }
  
      // Convert payment amount to cents
      const amountInCents = paymentAmount * 100;
  
      // Create payment using paymentMethodId
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'lkr',
        payment_method: paymentMethodId,
        description: 'Payment for your order',
        confirm: true,
        return_url: `http://localhost:7000/api/bill/${nextInvoiceId}`, // Use the next InvoiceId here
      });
  
      // Payment successful
      // Create an invoice record in the database with the generated InvoiceId
      const invoice = new Invoice({
        paymentIntentId: paymentIntent.id,
        amount: paymentAmount,
        cardholderName: cardholderName,
        status: 'paid', // Assuming the payment is successful
        InvoiceId: nextInvoiceId // Use the generated InvoiceId
      });
      await invoice.save();
  
      res.status(200).json({ message: 'Payment successful', paymentIntent });
    } catch (error) {
      // Payment failed
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = { createPayment };

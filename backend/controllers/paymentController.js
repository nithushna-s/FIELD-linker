const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Invoice = require("../models/Invoice");
const uuid = require("uuid");

const generateInvoiceId = () => {
  return uuid.v4();
};

const createSubscription = async (req, res) => {
  try {
    const { paymentMethodId, cardholderName, landno } = req.body;

    const priceId = "price_1Oon0VGUJNDaDPYQGqGDqUqJ";

    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = new Invoice({
      subscriptionId: subscription.id,
      landno: landno,
      cardholderName: cardholderName,
      status: "active",
    });

    await invoice.save();

    res
      .status(200)
      .json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSubscription };

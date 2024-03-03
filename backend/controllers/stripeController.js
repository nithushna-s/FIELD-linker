const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Controller function to handle webhook events
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Construct the event
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_TLzBB4MVGkhSoMtWm1lbkPTtOhkommzF');
  } catch (err) {
    // Return an error response if there's an issue with the webhook
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event based on its type
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent);
      // Handle successful payment intent (e.g., update database, send confirmation email)
      break;
    case 'payment_intent.failed':
      const failedPaymentIntent = event.data.object;
      console.log('PaymentIntent failed:', failedPaymentIntent);
      // Handle failed payment intent
      break;
    // Add more cases for other event types as needed
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }

  // Send a response to acknowledge receipt of the event
  res.json({ received: true });
};

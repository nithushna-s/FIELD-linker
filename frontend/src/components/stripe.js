import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Pay = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
        setPaymentError(error.message);
      } else {
        console.log('Payment successful:', paymentMethod);
        // Handle successful payment (e.g., send paymentMethod.id to your server)
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{}} />
      {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default Pay;

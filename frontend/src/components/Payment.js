import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const [cardholderName, setCardholderName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(15); 
  const [invoiceId, setInvoiceId] = useState(''); 

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment method using card details
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) {
      console.error('Error creating payment method:', error);
      alert(' Error creating payment method')
    } else {
      try {
        // Make request to create payment
        const response = await axios.post('http://localhost:7000/api/payment', {
          paymentMethodId: paymentMethod.id,
          cardholderName: cardholderName,
          paymentAmount: paymentAmount,
          invoiceId: invoiceId, 
        });
        console.log(response.data.message);
        alert(' payment is successful')
        // Redirect to success page if payment is successful
        window.location.href = '/bill';
      } catch (error) {
        console.error('Error processing payment:', error.message); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' ,marginTop:'10%',fontFamily:' Raleway,fantasy'}} id='payment'>
      <div style={{ marginBottom: '20px' }}>
        <label>Cardholder Name:</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Card Details:</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
      <span>
        <label style={{ display: 'inline' }}>Total Amount : </label>
        <p style={{ display: 'inline' }}>{paymentAmount} LKR</p>
      </span>
    </div>
      <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Pay  </button>
    </form>
  );
};

export default PaymentForm;

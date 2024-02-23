import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentForm = () => {
  const [showForm, setShowForm] = useState(true); 
  const [cardholderName, setCardholderName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(3500); 
  const [invoiceId, setInvoiceId] = useState(''); 

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
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
      toast.error('Error creating payment method');
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
        toast.success('Payment is successful Your Ad submitted successfully!');
        setTimeout(() => {
          window.location.href = '/post-adform';
        }, 4000);        
      } catch (error) {
        console.error('Error processing payment:', error.message); 
        toast.error('Error processing payment');
      }
    }
  };
  return (
    <> 

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%',marginBottom:'10%' }}>
      <div className="card1" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '25px', borderRadius: '8px', fontFamily: ' fantasy', marginRight: '20px', width: '40%', height: 'fit-content' }}>
      <h5 style={{paddingTop:'7%',color:'#137077'}}>Your ad has been submitted for review and<br/> requires a payment before it can be published.</h5>
        <h2 >Listing Fee</h2><br/>
        <h6 ><strong>Duration:</strong> 60 days</h6>
        <h6 ><strong>Item Limit:</strong> 1 item per ad</h6>
        <h6 ><strong>Cost:</strong> 3500 LKR</h6>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', fontFamily: 'fantasy', width: '40%', height: 'fit-content' }}>
          <h2 style={{color:'#137077'}}>Payment Form</h2>
          <div style={{ marginBottom: '20px' }}>
            <label>Cardholder Name:</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
              style={{ width: '70%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
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
          <button type="submit" style={{ backgroundColor: '#137077', color: '#fff', border: 'none', padding: '1% 7%', borderRadius: '10px', cursor: 'pointer' ,marginLeft:'80%'}}>Pay</button>
        </form>
      )}
    </div>
    <ToastContainer />

    </>
  );
};

export default PaymentForm;

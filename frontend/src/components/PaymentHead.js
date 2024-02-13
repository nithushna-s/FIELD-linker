import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Payment'; 

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51OiYmeSCoMveB3CZgXd8h9H3259KRUzSmjbbgrlMVrQQjBxOrlL2kviN5XBrJkX3GmkF195fNEJDN6Pa28TGps7900YDOdUPKC');

const PaymentHead = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentHead;

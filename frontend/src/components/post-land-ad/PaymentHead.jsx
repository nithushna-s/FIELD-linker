import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Payment'; 

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51OmWslAAFgyPeqSnlHI32kzvytpl33SrqbSYGXr1CG3M0Knkg7FzHmaSgnde5wHFnRHykBdmODgh0K2RQtnFSnkA00VWwC5vob');

const PaymentHead = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentHead;

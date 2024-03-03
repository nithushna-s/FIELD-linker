import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Payment'; 

const stripePromise = loadStripe('pk_test_51Oomx3GUJNDaDPYQbQyC2v4Rv4hugaqxIslqFbJvG7XsLK9X2DTdq0XjLsOYB68OxeYugd2RjMJSXXmNO68MG4Ge00xHctJzbP');

const PaymentHead = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
export default PaymentHead;

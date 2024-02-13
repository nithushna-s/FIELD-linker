import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceDetails = ({nextInvoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/bill/${nextInvoiceId}`);
        setInvoice(response.data.invoice);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice:', error.message);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [nextInvoiceId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : invoice ? (
        <div>
          <h2>Invoice Details</h2>
          <p>Payment Intent ID: {invoice.paymentIntentId}</p>
          <p>Amount: {invoice.amount}</p>
          <p>Cardholder Name: {invoice.cardholderName}</p>
          <p>Status: {invoice.status}</p>
          <p>Invoice ID: {invoice.InvoiceId}</p>
        </div>
      ) : (
        <p>Invoice not found</p>
      )}
    </div>
  );
};

export default InvoiceDetails;

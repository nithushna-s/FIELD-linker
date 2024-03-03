import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionForm = () => {
  const [user, setUser] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/api/subscriptions', { user, endDate, amountPaid });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('An error occurred while creating the subscription.');
    }
  };

  return (
    <div>
      <h2>Subscribe to a Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Amount Paid:</label>
          <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} required />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;

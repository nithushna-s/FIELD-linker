import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("http://localhost:7001/api/bill");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h2>All Subscriptions</h2>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription._id}>
            User: {subscription.user}, End Date: {subscription.endDate}, Amount
            Paid: {subscription.amountPaid}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;

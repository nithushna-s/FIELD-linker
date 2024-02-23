import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/users',{withCredentials:true});
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div>
      <h2>Total Users</h2>
      <p>{totalUsers}</p>
    </div>
  );
};

export default TotalUsers;

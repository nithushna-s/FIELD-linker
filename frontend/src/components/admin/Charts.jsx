import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [newRequestsCount, setNewRequestsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newPostsResponse = await axios.get('http://localhost:7000/api/lands' ,{withCredentials:true}, { params: { isNew: true } });
        setNewPostsCount(newPostsResponse.data.length);

        const newUsersResponse = await axios.get('http://localhost:7000/api/users',{withCredentials:true}, { params: { isNew: true } });
        setNewUsersCount(newUsersResponse.data.length);

        // Assuming you have an API endpoint for new requests
        const newRequestsResponse = await axios.get('http://localhost:7000/api/admin/rental-details',{withCredentials:true}, { params: { isNew: true } });
        setNewRequestsCount(newRequestsResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <i className="fas fa-clipboard-list"></i>
        <h2>Land Posts</h2>
        <p>{newPostsCount}</p>
      </div>

      <div>
        <i className="fas fa-users"></i>
        <h2>Users</h2>
        <p>{newUsersCount}</p>
      </div>

      <div>
        <i className="fas fa-envelope"></i>
        <h2>Requests</h2>
        <p>{newRequestsCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [newRequestsCount, setNewRequestsCount] = useState(0);
  const [newSalesDetailsCount, setNewSalesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newPostsResponse = await axios.get('http://localhost:7001/api/lands', { withCredentials: true, params: { isNew: true } });
        setNewPostsCount(newPostsResponse.data.length);

        const newUsersResponse = await axios.get('http://localhost:7001/api/users', { withCredentials: true, params: { isNew: true } });
        setNewUsersCount(newUsersResponse.data.length);

        const newRequestsResponse = await axios.get('http://localhost:7001/api/admin/rental-details', { withCredentials: true, params: { isNew: true } });
        setNewRequestsCount(newRequestsResponse.data.length);

        const newSalesResponse = await axios.get('http://localhost:7001/api/admin/sales-details', { withCredentials: true });
        setNewSalesCount(newSalesResponse.data.length); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={dashboardStyle}>
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <div style={columnStyle}>
            <i className="fas fa-users"></i>
            <h2>Users</h2>
            <p>{newUsersCount}</p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={columnStyle}>
            <i className="fas fa-clipboard-list"></i>
            <h2>Land Posts</h2>
            <p>{newPostsCount}</p>
          </div>
        </div>


      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <div style={columnStyle}>
            <i className="fas fa-envelope"></i>
            <h2>Rend & Lease Requests</h2>
            <p>{newRequestsCount}</p>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={columnStyle}>
            <i className="fas fa-envelope"></i>
            <h2>Sales Requests</h2>
            <p>{newSalesDetailsCount}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const dashboardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop:'10%',
  marginLeft:'25%',

};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
};

const cardStyle = {
  width: '35%',
  margin: '10px',
  padding: '3%',
  borderRadius: '5px',
  color: 'white',
  backgroundImage: 'linear-gradient(to right, #137077, #0D7377 )',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default Dashboard;

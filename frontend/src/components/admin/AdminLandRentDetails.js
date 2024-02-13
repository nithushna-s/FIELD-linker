import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/rendel.css';

const AdminRentalList = () => {
  const [rentalDetails, setRentalDetails] = useState([]);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/admin/rental-details');
        setRentalDetails(response.data);
      } catch (error) {
        console.error('Error fetching rental details:', error);
      }
    };

    fetchRentalDetails();
  }, []);

  return (
    <div>
      <h2 style={{textAlign:'center'}}>All Rental Details</h2>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Rental-ID</th>
            <th>Land-ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rentalDetails) && rentalDetails.map((rental, index) => (
            <tr key={rental._id}>
              <td>{rentalDetails.length - index}</td>
              <td>{rental._id}</td>
              <td>{rental.land}</td>
              <td>{rental.startDate}</td>
              <td>{rental.endDate}</td>
              <td>{rental.name}</td>
              <td>{rental.address}</td>
              <td>{rental.email}</td>
              <td>{rental.phoneNumber}</td>
              <td>{rental.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRentalList;

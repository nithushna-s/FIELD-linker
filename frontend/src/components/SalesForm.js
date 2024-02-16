import React, { useState } from 'react';
import axios from 'axios';

const SalesForm = ({ landId, onCloseModal }) => {
  const [salesData, setSalesData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:7000/api/lands/${landId}/sales`, salesData);
      window.alert('Sales form submitted successfully!');
      onCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error('Error submitting sales form:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    
    <form onSubmit={handleFormSubmit} style={{background:'white',padding:'40px',      fontFamily: 'Raleway,fantasy'
  }}>
        <h4>Land Sale Request</h4>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={salesData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={salesData.address}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={salesData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={salesData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" className="submit-form-button" style={{ background: '#137077', textAlign: 'center' }}>
        Submit 
      </button>
    </form>
  );
};

export default SalesForm;

import React, { useState } from 'react';
import axios from 'axios';

const RentalForm = ({ landId, onCloseModal }) => {
  const [rentalData, setRentalData] = useState({
    startDate: '',
    endDate: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:7000/api/lands/${landId}/rental`, rentalData);
      window.alert('Rental form submitted successfully!');
      onCloseModal(); 
    } catch (error) {
      console.error('Error submitting rental form:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit} style={{background:'white',padding:'40px'}}>
                <h4>Land Rental Request</h4>

      <label>
        Rental Start Date:
        <input
          type="date"
          name="startDate"
          value={rentalData.startDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Rental End Date:
        <input
          type="date"
          name="endDate"
          value={rentalData.endDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={rentalData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={rentalData.address}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={rentalData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={rentalData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit" className="submit-form-button" style={{ background: '#137077', textAlign: 'center' }}>
        Submit 
      </button>
    </form>
  );
};

export default RentalForm;

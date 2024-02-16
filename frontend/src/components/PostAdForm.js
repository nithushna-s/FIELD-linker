import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './nav';
import Footernext from './abouthefooter';
import PaymentForm from './PaymentHead'; 

const PostAdForm = () => {
  const [formData, setFormData] = useState({
    landType: '',
    rentOrLease: 'Rent',
    location: '',
    landSize: '',
    rentOrLeasePrice: '',
    waterDetails: '',
    electricityStatus: 'Available',
    otherDetails: '',
    image: null,
    name: '',
    email: '',
    phoneNumbers: '',
    OtherNumbers: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:7000/api/lands', formDataToSend);

      if (response.status === 201) {
        setSubmitted(true); // Set submitted state to true after successful form submission
      } else {
        // Handle error case
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleImageBoxClick = () => {
    document.getElementById('imageInput').click();
  };

  const imageInputStyles = {
    width: '100%',
    height: '110px',
    cursor: 'pointer',
    backgroundColor: '#ffff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  return (
  
    < >
      <Navbar />

      <div className="container  justify-content-center align-items-center" style={{fontFamily:'Poppins', fontSize:'1.1rem',marginBottom:'5%',marginTop:'6%', }}>       
      {!submitted ? ( <form
          id="regForm"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          action="http://localhost:7000/api/lands"
          method="POST"
          className="p-4 rounded shadow-lg"
       style={{ maxWidth: '70vw', border: '1px solid #ccc', }} 
        >
          <h1 className="mb-4 " style={{ color:'#137077',textAlign:'center' }} >Post Your Ad</h1>
          <br/>

          <div className="row" style={{marginLeft:'18%'}}>
            {/* Land Information Section */}
            <div className="col-md-4 ">
              <div className="mb-3">
                <h4 >Land Information</h4>
                <label htmlFor="landType" className="form-label">
                Crop Types:
                </label>
                <input type="text" id="landType" name="landType" onChange={handleChange} value={formData.landType} required className="form-control" />

                <label htmlFor="rentOrLease" className="form-label">
                Sale, Rent or Lease:
                </label>
                <select id="rentOrLease" name="rentOrLease" onChange={handleChange} value={formData.rentOrLease} required className="form-control">
                <option value="Lease">Sale</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                </select>

                <label htmlFor="location" className="form-label">
                  Location:
                </label>
                <input type="text" id="location" name="location" onChange={handleChange} value={formData.location} required className="form-control" />

                <label htmlFor="landSize" className="form-label">
                  Land Size:
                </label>
                <input type="text" id="landSize" name="landSize" onChange={handleChange} value={formData.landSize} required className="form-control" />

                <label htmlFor="rentOrLeasePrice" className="form-label">
                Sale, Rent Or Lease Price:
                </label>
                <input type="text" id="rentOrLeasePrice" name="rentOrLeasePrice" onChange={handleChange} value={formData.rentOrLeasePrice} required className="form-control" />

                <label htmlFor="waterDetails" className="form-label">
                  Water Details:
                </label>
                <input type="text" id="waterDetails" name="waterDetails" onChange={handleChange} value={formData.waterDetails} required className="form-control" />

                <label htmlFor="electricityStatus" className="form-label">
                  Electricity Status:
                </label>
                <select id="electricityStatus" name="electricityStatus" onChange={handleChange} value={formData.electricityStatus} required className="form-control">
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <label htmlFor="otherDetails" className="form-label">
                  Other Details:
                </label>
                <input type="text" id="otherDetails" name="otherDetails" onChange={handleChange} value={formData.otherDetails} required className="form-control" />
              </div>
            </div>
     {/* Land Image Section */}
<div className="col-md-4" style={{marginLeft:'10%'}}>
  <div className="mb-3">
    <h4>Land Image</h4>
    <label className="image-label" style={{paddingBottom:'3px'}}>Land Image:</label>
    <div className="image-input" onClick={handleImageBoxClick} style={imageInputStyles}>
     
      {formData.image ? (
        <div className="image-preview mt-2" style={{ width: '100%', height: '100%' }}>
          <img src={URL.createObjectURL(formData.image)} alt="Selected" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div className="placeholder-box" id="imageBox">
          <img src="path/to/default-icon.png" alt="Image Icon" style={{ width: '45px', height: '40px' }} />
        </div>
      )}
      <input
        type="file"
        id="imageInput"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
        className="visually-hidden"
      />
    </div>
  </div>
  <br/>

              <div className="mb-3">
                <h4>Information</h4>
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} required className="form-control" />

                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="text" id="email" name="email" onChange={handleChange} value={formData.email} required className="form-control" />

                <label htmlFor="phoneNumbers" className="form-label">
                  Phone Numbers:
                </label>
                <input type="text" id="phoneNumbers" name="phoneNumbers" onChange={handleChange} value={formData.phoneNumbers} required className="form-control" />

                <label htmlFor="OtherNumbers" className="form-label">
                  Other Numbers:
                </label>
                <input type="text" id="OtherNumbers" name="OtherNumbers" onChange={handleChange} value={formData.OtherNumbers} required className="form-control" />

                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input type="text" id="address" name="address" onChange={handleChange} value={formData.address} required className="form-control" />
              </div>
              <div className="w-100 d-flex justify-content-end mb-3">
              <button type="submit"  style={{padding:'3% 15%', backgroundColor: '#137077',color: 'white',cursor: 'pointer',borderRadius:'8%'}}>
              Submit
</button>

          </div>
            </div>
            
          </div>

          
        </form>
          ) : ( 
            <PaymentForm formData={formData} />
            )}
      </div>
      
      <Footernext/>
    </>
  );
};

export default PostAdForm;
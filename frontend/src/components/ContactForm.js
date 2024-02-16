import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../CSS/ContactForm.css'
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when the user starts typing
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!validateEmail(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    setValidationErrors(errors);

    // Check if there are any validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:7000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponse(data.message);

      if (response.status === 200) {
        alert('Email sent successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse('Error sending the email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
<div id='contact'>
    <div   style={{
      display: 'flex',
      justifyContent: 'center',
     marginTop:'5%',
      height: '65vh',
      marginBottom:'10%',
      fontFamily: 'Raleway,fantasy'

    }}>
      {/* Combined Container */}
      <div style={{
        display: 'flex',
        width: '64%',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}        
      >
        {/* Contact Information Section (Left Side) */}
        <div className='Contact-Information' style={{
          flex: 1,
          padding: '40px',
           with:'70%',
            textAlign:'  justify',
            fontFamily: 'Raleway,fantasy',
            borderRight: '1px solid #ccc',
          background:'#137077',
          color:'white'
        }}>
          <h2 style={{marginLeft:'12%'}}>Contact Information</h2>
          <br /><br />
          <p style={{ paddingLeft:'13%',fontSize:'17px'}}><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: Rameshpuram,chenkalady,batticaloa.</p>
          <br /><br />
          <p  style={{ paddingLeft:'13%',fontSize:'17px'}}><FontAwesomeIcon icon={faPhone} /> Phone: (123) 456-7890</p>
          <br /><br />
          <p  style={{ paddingLeft:'13%',fontSize:'17px'}}><FontAwesomeIcon icon={faEnvelope} /> Email: velanmai@gmail.com</p>
        </div>

        {/* Contact Form Section (Right Side) */}
        <div className="contact-form-container" style={{
          flex: 1,
          padding: '40px',
          textAlign: 'center',
        }}>
          <h2 style={{ color: '#137077' }}>Contact Form</h2><br />
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ marginBottom: '8px',fontSize:'17px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '75%',
                padding: '8px',
                marginBottom: '16px',
                border: `1px solid ${validationErrors.name ? 'red' : '#ccc'}`,
                borderRadius: '4px',
              }}
            />
            {validationErrors.name && <p style={{ color: 'red', marginTop: '5px' }}>{validationErrors.name}</p>}

            <label style={{ marginBottom: '8px',fontSize:'17px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '75%',
                padding: '8px',
                marginBottom: '16px',
                border: `1px solid ${validationErrors.email ? 'red' : '#ccc'}`,
                borderRadius: '4px',
              }}
            />
            {validationErrors.email && <p style={{ color: 'red', marginTop: '0px' }}>{validationErrors.email}</p>}

            <label style={{ marginBottom: '8px' ,fontSize:'17px'}}>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '75%',
                padding: '8px',
                marginBottom: '16px',
                border: `1px solid ${validationErrors.message ? 'red' : '#ccc'}`,
                borderRadius: '4px',
              }}
            />
            {validationErrors.message && <p style={{ color: 'red', marginTop: '0px' }}>{validationErrors.message}</p>}

            <button class="button-82-pushable" role="button"   style={{textAlign:'center', cursor: 'pointer',width:'78%' }}>
<span class="button-82-shadow"></span>
<span class="button-82-edge"></span>
<span class="button-82-front text">
Submit
</span>
</button>
          </form>

          {response && <p style={{ color: response.includes('success') ? 'green' : 'red', marginTop: '0px' }}>{response}</p>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;


import React, { Component } from 'react';
import Navbar from './nav';
import  Footernext from './abouthefooter';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class SignUp extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isFormValid: true,
      validationErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isFormValid: true,
      validationErrors: {
        ...this.state.validationErrors,
        [e.target.name]: '',
      },
    });
  };

  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  validatePassword = (password) => {
    return password.length >= 6;
  };

  validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  validateForm = () => {
    const { firstName, lastName, email, password } = this.state;
    const validationErrors = {};

    if (!this.validateName(firstName)) {
      validationErrors.firstName = 'Please enter a valid first name';
    }

    if (!this.validateName(lastName)) {
      validationErrors.lastName = 'Please enter a valid last name';
    }

    if (!this.validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!this.validatePassword(password)) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    this.setState({ validationErrors });

    return Object.keys(validationErrors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    if (this.validateForm()) {
      try {
        const response = await fetch('http://localhost:7000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          alert('Sign Up successful!');
  
          // Save user data and token as cookies
          Cookies.set('user', JSON.stringify(userData.user), { expires: 1 });
          Cookies.set('token', userData.token, { expires: 1 });
  
          const navigate = useNavigate();
          navigate('/');
          console.log('Sign Up submitted:', this.state);
        } else {
          const errorData = await response.json();
          console.error('Error during signup:', errorData);
          alert('User already registered');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };
  
  render() {
    const { isFormValid, validationErrors } = this.state;
    const authInnerStyle = {
      width: '450px',
      margin: 'auto',
      marginTop:'5%',
      background: '#ffffff',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      padding: '40px 55px 45px 55px',
      borderRadius: '15px',
      marginBottom:'1%',
      transition: 'all .3s',
      fontFamily:'sans-serif'
      
    };
    return (
      <>
                      <Navbar />

      <form onSubmit={this.handleSubmit} style={authInnerStyle}>
        <h3 style={{ color:'#137077',textAlign:'center' }} >Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
            placeholder="First name"
            onChange={this.handleInputChange}
          />
          {validationErrors.firstName && (
            <div className="invalid-feedback">{validationErrors.firstName}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
            placeholder="Last name"
            onChange={this.handleInputChange}
          />
          {validationErrors.lastName && (
            <div className="invalid-feedback">{validationErrors.lastName}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
            placeholder="Enter email"
            onChange={this.handleInputChange}
          />
          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
            placeholder="Enter password"
            onChange={this.handleInputChange}
          />
          {validationErrors.password && (
            <div className="invalid-feedback">{validationErrors.password}</div>
          )}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn " style={{padding:'6px',border:'none', background:'skyblue'}}>
            Sign Up
          </button>
        </div>
        <br/>
        <p className="forgot-password text-right">
          Already registered <a href="/SignIn">sign in?</a>
        </p>
        {!isFormValid && (
          <p className="text-danger">Please enter valid information for all fields before submitting the form.</p>
        )}
      </form>
      < Footernext />

      </>
    );
  }
}

export default SignUp;

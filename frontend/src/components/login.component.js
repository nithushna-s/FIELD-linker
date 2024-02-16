import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './nav';
import Footernext from './abouthefooter';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isPasswordValid);

    return isEmailValid && isPasswordValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:7000/api/login', {
          email,
          password,
        });
  
        if (response.data.isAdmin) {
          alert('Admin sign-in successful!');
          navigate('/admin');
        } else {
          alert('Sign-in successful!');
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Invalid email or password. Please try again.');
      }
    } else {
      console.log('Form validation failed');
    }
  };
  
  
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/logout', {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        alert('Logout successful!');
        navigate('/');
  
        // Clear cookies
        document.cookie = 'user=;max-age=-1;path=/';
        document.cookie = 'token=;max-age=-1;path=/';
      } else {
        console.error('Error during logout:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const authInnerStyle = {
    width: '450px',
    margin: 'auto',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    padding: '40px 55px 45px 55px',
    borderRadius: '15px',
    marginTop: '9%',
    transition: 'all .3s',
    marginBottom: '5%',
    fontFamily: 'Raleway,fantasy',
    // backgroundImage: 'none', 
  };

  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit} style={authInnerStyle}>
        <h3 style={{ color: '#137077', textAlign: 'center' }}>Sign In</h3>
        <div className={`mb-3 ${isEmailValid ? 'has-success' : 'has-error'}`}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${isEmailValid ? 'none' : 'is-invalid'}`}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={`mb-3 ${isPasswordValid ? 'has-success' : 'has-error'}`}>
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'} 
              name="password"
              className={`form-control ${isPasswordValid ? 'none' : 'is-invalid'}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="icon"
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            >
              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" style={{ padding: '7px', border: 'none', background: 'skyblue' }}>
            Submit
          </button>
        </div><br/>
        <p className="forgot-password text-right">
          Create a new account <a href="/signup" style={{display:'inline'}}>SignUp</a>
        </p>
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
            style={{ padding: '6px' ,border: 'none',}}
          >
            Logout
          </button>
        </div>
      </form>
      <Footernext />
    </>
  );
};

export default Login;

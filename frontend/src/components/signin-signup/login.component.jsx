import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/nav";
import Footernext from "../home/abouthefooter";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7001/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { token, isAdmin } = response.data;

      // Save token and isAdmin flag to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);

      // Save token in cookie
      document.cookie = `token=${token}; max-age=3600; path=/`;
      document.cookie = `isAdmin=${isAdmin}`;
      if (isAdmin) {
        toast.success("Admin sign-in successful!");
        console.log(response.data);
        setTimeout(() => {
          navigate("/admin/Dashboard");
        }, 2000);
      } else {
        toast.success("Sign-in successful!");
        setTimeout(() => {
          navigate("/post-adform");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isPasswordValid);
    return isEmailValid && isPasswordValid;
  };

  const authInnerStyle = {
    width: "450px",
    margin: "auto",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    padding: "40px 55px 45px 55px",
    borderRadius: "15px",
    marginTop: "9%",
    transition: "all .3s",
    marginBottom: "5%",
    fontFamily: "Raleway, fantasy",
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} style={authInnerStyle}>
        <h3 style={{ color: "#137077", textAlign: "center" }}>Sign In</h3>
        <div className={`mb-3 ${isEmailValid ? "has-success" : "has-error"}`}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${isEmailValid ? "none" : "is-invalid"}`}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={`mb-3 ${isPasswordValid ? "has-success" : "has-error"}`}
        >
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control ${
                isPasswordValid ? "none" : "is-invalid"
              }`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="icon"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "7px", background: "#0A3C50" }}
          >
            Submit
          </button>
        </div>
        <br />
        <p className="forgot-password text-right">
          Create a new account{" "}
          <a href="/signup" style={{ display: "inline" }}>
            SignUp
          </a>
        </p>
      </form>
      <Footernext />
      <ToastContainer />
    </>
  );
};

export default Login;

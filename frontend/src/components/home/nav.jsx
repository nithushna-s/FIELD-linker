import React, { useState, useEffect } from "react";
import logocompany from "../Assets/image/field-linker.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [activeLink, setActiveLink] = useState("home");
  const token = localStorage.getItem("token");

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkHover = (link) => {
    setActiveLink(link);
  };

  const handleLinkLeave = () => {
    setActiveLink("");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7001/api/logout");
      localStorage.removeItem("token");
      document.cookie = "token=;max-age=0;path=/";
      toast.success("Logout successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  const navbarStyle = {
    backgroundColor: "white",
    color: "#1E2C25",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "sans-serif",
    fontSize: "1.3em",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: "10%",
  };

  const logoStyle = {
    marginRight: "10px",
    width: "75px",
    height: "auto",
  };

  const toggleStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "#1E2C25",
    display: isSmallScreen ? "inline" : "none",
  };

  const linksStyle = {
    listStyle: "none",
    display: "flex",
    marginRight: "10%",
    marginTop: "1%",
  };

  const linkItemStyle = {
    marginRight: "25px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#1E2C25",
    transition: "color 0.3s ease",
  };

  const hoverLinkStyle = {
    color: "#137077",
  };

  const hoverLiStyle = {
    backgroundColor: "transparent",
  };

  const responsiveLinksStyle = {
    display: "none",
    flexDirection: "row",
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const responsiveLinksOpenStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <div style={brandStyle}>
          <span style={logoStyle}>
            <Link
              to="/"
              style={
                activeLink === "home"
                  ? { ...linkStyle, ...hoverLinkStyle }
                  : linkStyle
              }
            >
              <img
                src={logocompany}
                alt="logo"
                style={{ width: "300%" }}
                height={"41vh"}
              />
            </Link>
          </span>
          <button style={toggleStyle} onClick={toggleNav}>
            &#9776;
          </button>
        </div>
        <ul
          style={
            isSmallScreen
              ? isNavOpen
                ? { ...linksStyle, ...responsiveLinksOpenStyle }
                : responsiveLinksStyle
              : linksStyle
          }
        >
          <li
            style={
              activeLink === "home"
                ? { ...linkItemStyle, ...hoverLiStyle }
                : linkItemStyle
            }
            onMouseOver={() => handleLinkHover("home")}
            onMouseLeave={handleLinkLeave}
          >
            <Link
              to="/"
              style={
                activeLink === "home"
                  ? { ...linkStyle, ...hoverLinkStyle }
                  : linkStyle
              }
            >
              Home
            </Link>
          </li>
          <li
            style={
              activeLink === "about"
                ? { ...linkItemStyle, ...hoverLiStyle }
                : linkItemStyle
            }
            onMouseOver={() => handleLinkHover("about")}
            onMouseLeave={handleLinkLeave}
          >
            <a
              href="#about"
              style={
                activeLink === "about"
                  ? { ...linkStyle, ...hoverLinkStyle }
                  : linkStyle
              }
            >
              About
            </a>
          </li>
          <li
            style={
              activeLink === "Services"
                ? { ...linkItemStyle, ...hoverLiStyle }
                : linkItemStyle
            }
            onMouseOver={() => handleLinkHover("Services")}
            onMouseLeave={handleLinkLeave}
          >
            <a
              href="#services"
              style={
                activeLink === "Services"
                  ? { ...linkStyle, ...hoverLinkStyle }
                  : linkStyle
              }
            >
              Services
            </a>
          </li>
          <li
            style={
              activeLink === "contact"
                ? { ...linkItemStyle, ...hoverLiStyle }
                : linkItemStyle
            }
            onMouseOver={() => handleLinkHover("contact")}
            onMouseLeave={handleLinkLeave}
          >
            <a
              href="#contact"
              style={
                activeLink === "contact"
                  ? { ...linkStyle, ...hoverLinkStyle }
                  : linkStyle
              }
            >
              Contact Us
            </a>
          </li>
          {token ? (
            <li>
              <button onClick={handleLogout}>Sign-Out</button>
            </li>
          ) : (
            <li
              style={
                activeLink === "Sign-In"
                  ? { ...linkItemStyle, ...hoverLiStyle }
                  : linkItemStyle
              }
              onMouseOver={() => handleLinkHover("Sign-In")}
              onMouseLeave={handleLinkLeave}
            >
              <Link
                to="/signin"
                style={
                  activeLink === "Sign-In"
                    ? { ...linkStyle, ...hoverLinkStyle }
                    : linkStyle
                }
              >
                Sign-In
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;

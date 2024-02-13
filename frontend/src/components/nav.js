import React, { useState, useEffect } from 'react';
import logocompany from '../Assets/image/field-linker.png';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkHover = (link) => {
    setActiveLink(link);
  };

  const handleLinkLeave = () => {
    setActiveLink('');
  };

  const navbarStyle = {
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'sans-serif',
    fontSize: '1.3em',
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10%',
  };

  const logoStyle = {
    marginRight: '10px',
    width: '75px',
    height: 'auto',
  };

  const toggleStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: 'black',
    display: isSmallScreen ? 'inline' : 'none',
  };

  const linksStyle = {
    listStyle: 'none',
    display: 'flex',
    marginRight: '10%',
    marginTop: '1%',
  };

  const linkItemStyle = {
    marginRight: '25px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    transition: 'color 0.3s ease',
  };

  const hoverLinkStyle = {
    color: '#137077',
  };

  const hoverLiStyle = {
    backgroundColor: 'transparent',
  };

  const responsiveLinksStyle = {
    display: 'none',
    flexDirection: 'row',
    position: 'absolute',
    top: '60px',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const responsiveLinksOpenStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <div style={brandStyle}>
          <span style={logoStyle}>
            <Link to="/" style={activeLink === 'home' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
              <img src={logocompany} alt="logo" style={{ width: '300%' }} height={'41vh'} />
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
            style={activeLink === 'home' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('home')}
            onMouseLeave={handleLinkLeave}
          >
            <Link to="/" style={activeLink === 'home' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
              Home
            </Link>
          </li>
          <li
            style={activeLink === 'about' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('about')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="#about" style={activeLink === 'about' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
              About
            </a>
          </li>
          <li
            style={activeLink === 'Services' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('Services')}
            onMouseLeave={handleLinkLeave}
          >
         <a href="#services" style={activeLink === 'Services' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
              Services
            </a>
          </li>
          <li
            style={activeLink === 'contact' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('contact')}
            onMouseLeave={handleLinkLeave}
          >
           <a href="#contact" style={activeLink === 'contact' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
              Contact Us
            </a>
          </li>
          {isAuthenticated ? (
            <li
              style={activeLink === 'logout' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
              onMouseOver={() => handleLinkHover('logout')}
              onMouseLeave={handleLinkLeave}
            >
              <button onClick={handleLogout} style={activeLink === 'logout' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
                Logout
              </button>
            </li>
          ) : (
            <li
              style={activeLink === 'login' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
              onMouseOver={() => handleLinkHover('login')}
              onMouseLeave={handleLinkLeave}
            >
              <Link to="/signin" style={activeLink === 'login' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
                Sign-In
              </Link>
            </li>
          )}
            <li id="google_translate_element"></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

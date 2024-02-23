import React, { useState ,useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import favicon from '../Assets/image/logo.png';


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

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
    color:'#137077',
    fontFamily: 'sans-serif' ,
     height:'10vh',
    fontSize:'1.2em'

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
    display: isSmallScreen ? 'block' : 'none',
  };

  const linksStyle = {
    listStyle: 'none',
    display: 'flex',
    marginRight: '10%',
  };

  const linkItemStyle = {
    marginRight: '25px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    transition: 'color 0.3s ease',
    paddingTop:'20px'
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
    display: 'block',
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
        toast.success('Logout successful!'); 
        setTimeout(() => {
          window.location.href = '/'; 
        }, 2000); 
        console.log('Logout submitted');
      } else {
        const errorData = await response.json();
        toast.error('Error during logout:', errorData);
      }
    } catch (error) {
      toast.error('Error during logout:', error);
    }
  };
  
  return (
    <div>
      <nav style={navbarStyle}>
        <div style={brandStyle}>
        <img src={favicon} height={70} />
          <span style={logoStyle}>
           
          </span>
          <button style={toggleStyle} onClick={toggleNav}>
            &#9776;
          </button>
        </div>
        <ul style={isSmallScreen ? (isNavOpen ? { ...linksStyle, ...responsiveLinksOpenStyle } : responsiveLinksStyle) : linksStyle}>
          <li
            style={activeLink === 'home' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('home')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/Dashboard" style={activeLink === 'home' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            Dashboard
            </a>
          </li>
          <li
            style={activeLink === 'about' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('about')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/userdetailse" style={activeLink === 'about' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            Customers
            </a>
          </li>
          <li
            style={activeLink === 'contact' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('contact')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/LandDetails" style={activeLink === 'contact' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            LandPostDetails
            </a>
          </li>
          <li
            style={activeLink === 'login' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('login')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/LandRentDetails" style={activeLink === 'login' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            LandRentDetails
            </a>
          </li>
           <li
            style={activeLink === ' AdminSalesList' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover(' AdminSalesList')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/LandSalesList" style={activeLink === 'SubscriptionsList' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            LandSalesList
            </a>
          </li>
          <li
            style={activeLink === 'SubscriptionsList' ? { ...linkItemStyle, ...hoverLiStyle } : linkItemStyle}
            onMouseOver={() => handleLinkHover('SubscriptionsList')}
            onMouseLeave={handleLinkLeave}
          >
            <a href="/admin/SubscriptionsList" style={activeLink === 'SubscriptionsList' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}>
            SubscriptionsList
            </a>
          </li>
          <li
            onClick={handleLogout}
            style={activeLink === 'login' ? { ...linkStyle, ...hoverLinkStyle } : linkStyle}          >
            <a  >
              Log-out
            </a>
         </li>
        </ul>
      </nav>
      <div ></div>
      <ToastContainer />

    </div>
  );
};

export default Navbar;

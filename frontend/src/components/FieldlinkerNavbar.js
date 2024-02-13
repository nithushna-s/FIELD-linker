// Navbar.js
import React from 'react';

const FieldlinkerNavbar = ({ overlay, navCloseBtn, navOpenBtn, navbarLinks }) => {
  const navElemArr = [overlay, navCloseBtn, navOpenBtn, ...navbarLinks];

  const handleNavClick = () => {
    navElemArr.forEach((elem) => elem.classList.toggle("active"));
  };

  return (
    <nav>
      <header className="header" data-header>

        <div className="overlay" data-overlay></div>

        <div className="header-top" style={{ backgroundColor: 'white', color: 'rgb(255,90,61)' }}>
          <div className="container" >

          </div>
        </div>

        <div className="header-bottom">
          <div className="container">

            <a href="#" className="logo">
              <span> <img src="./assets/images/Screenshot from 2023-12-30 19-56-34.png" alt="Homeverse logo" height="50vh" /></span>
              <span></span>
            </a>

            <nav className="navbar" data-navbar>

              <div className="navbar-top">

                <a href="#" className="logo">
                  <img src="./assets/images/Screenshot from 2023-12-30 19-56-34.png" alt="Homeverse logo" />
                </a>

                <button className="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
                  <i name="close-outline"></i>
                </button>

              </div>

              <div className="navbar-bottom">
                <ul className="navbar-list">

                  <li>
                    <a href="#home" className="navbar-link" data-nav-link>Home</a>
                  </li>

                  <li>
                    <a href="#about" className="navbar-link" data-nav-link>About</a>
                  </li>

                  <li>
                    <a href="#service" className="navbar-link" data-nav-link>Service</a>
                  </li>

                  <li>
                    <a href="#property" className="navbar-link" data-nav-link>Property</a>
                  </li>

                  <li>
                    <a href="#blog" className="navbar-link" data-nav-link>Blog</a>
                  </li>

                  <li>
                    <a href="#contact" className="navbar-link" data-nav-link>Contact</a>
                  </li>

                </ul>
              </div>

            </nav>

            <div className="header-bottom-actions">

              <button className="header-bottom-actions-btn" aria-label="Profile">
                <i name="person-outline"></i>
                <span>Login</span>
              </button>

              <button className="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu">
                <i name="menu-outline"></i>
                <span>Menu</span>
              </button>

            </div>

          </div>
        </div>

      </header>
      <button onClick={handleNavClick}>Toggle Navbar</button>
    </nav>
  );
};

export default FieldlinkerNavbar;

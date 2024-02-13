
import React, { useState, useEffect } from 'react';

const ANavbar = () => {

  const [isActive, setIsActive] = useState(false);

  const elemToggleFunc = (elem) => {
    elem.classList.toggle("active");
  };

  useEffect(() => {
    const navbar = document.querySelector("[data-navbar]");
    const overlay = document.querySelector("[data-overlay]");
    const navCloseBtn = document.querySelector("[data-nav-close-btn]");
    const navOpenBtn = document.querySelector("[data-nav-open-btn]");
    const navbarLinks = document.querySelectorAll("[data-nav-link]");

    const navElemArr = [overlay, navCloseBtn, navOpenBtn];

    for (let i = 0; i < navbarLinks.length; i++) {
      navElemArr.push(navbarLinks[i]);
    }

    const handleNavClick = () => {
      elemToggleFunc(navbar);
      elemToggleFunc(overlay);
    };

    navElemArr.forEach((elem) => {
      elem.addEventListener("click", handleNavClick);
    });

    const handleScroll = () => {
      setIsActive(window.scrollY >= 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      navElemArr.forEach((elem) => {
        elem.removeEventListener("click", handleNavClick);
      });

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isActive ? 'active' : ''}`} data-header>
      <div className="overlay" data-overlay></div>


          <nav className="navbar" data-navbar style={{fontFamily:'sans-serif'}}>
            <div className="navbar-top">
              <a href="#" className="logo">
                <img src="./assets/images/Screenshot from 2023-12-30 19-56-34.png" alt="Homeverse logo" />
              </a>

              <button className="nav-close-btn" data-nav-close-btn aria-label="Close Menu">
                <ion-icon name="close-outline"></ion-icon>
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
                  <a href="#service" className="navbar-link" data-nav-link>Contact</a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="header-bottom-actions">
            <button className="header-bottom-actions-btn" aria-label="Profile">
              <ion-icon name="person-outline"></ion-icon>
              <span>Login</span>
            </button>

            <button className="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu">
              <i name="menu-outline"></i>
              <span>Menu</span>
            </button>
          </div>

    </header>
  );
};




export default ANavbar;

import React from "react";
import logoImage from "../Assets/image/logo-light.png";
const Footer = () => {
  const aStyle = {
    textDecoration: "none",
    color: " white",
  };
  return (
    <div>
      {/* Footer Section */}
      <footer
        className="footer"
        style={{ fontFamily: "Raleway,fantasy", background: "#137077" }}
      >
        <div className="footer-top">
          <div className="container">
            <div class="footer-brand">
              <ul class="contact-list">
                <li>
                  <img src={logoImage} alt="logo" style={{ width: "80%" }} />
                </li>
                <li>
                  <a href="#" class="contact-link">
                    <i name="location-outline"></i>

                    <address> Rameshpuram,Chenkalady,Batticaloa.</address>
                  </a>
                </li>

                <li>
                  <a href="mailto:contact@homeverse.com" class="contact-link">
                    <i name="mail-outline"></i>

                    <span>contact@veelaanmai.com</span>
                  </a>
                </li>
              </ul>

              <ul class="social-list">
                <li>
                  <a href="#" class="social-link">
                    <i name="logo-facebook"></i>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <i name="logo-twitter"></i>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <i name="logo-linkedin"></i>
                  </a>
                </li>

                <li>
                  <a href="#" class="social-link">
                    <i name="logo-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-link-box">
              <ul class="footer-list">
                <li>
                  <p class="footer-list-title">Company</p>
                </li>

                <li>
                  <a href="#" class="footer-link">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" class="footer-link">
                    All Cultivatione Lands
                  </a>
                </li>
              </ul>

              <ul class="footer-list">
                <li>
                  <p class="footer-list-title">Services</p>
                </li>

                <li>
                  <a href="/post-adform" class="footer-link">
                    Providing Land
                  </a>
                </li>

                <li>
                  <a href="/AgrilandsSection" class="footer-link">
                    {" "}
                    Renting Land
                  </a>
                </li>
              </ul>

              <ul class="footer-list">
                <li>
                  <p class="footer-list-title">Customer Care</p>
                </li>

                <li>
                  <a href="/signin" class="footer-link">
                    Login
                  </a>
                </li>

                <li>
                  <a href="/contact" class="footer-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">&copy; 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

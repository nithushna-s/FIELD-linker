import React from "react";
import logoImage from "../Assets/image/logo-light.png";
import "../Assets/CSS/style.css";
const Footer = () => {
  return (
    <div>
      {/* CTA Section */}
      <section className="cta" style={{ fontFamily: "Raleway,fantasy" }}>
        <div className="container">
          <div
            className="cta-card"
            style={{ background: "white", color: "#137077" }}
          >
            <div className="card-content">
              <p className="h2 card-title" style={{ color: "#137077" }}>
                Cultivate Your Dreams with Us!{" "}
              </p>
              <p className="card-text" style={{ color: "#137077" }}>
                Discover Prime Land For Rent Or Lease.
              </p>
            </div>
            <span style={{ display: "inline-block", marginLeft: "5px" }}>
              <a href="/cultivatione-lands-Section">
                <button class="button-82-pushable" role="button">
                  <span class="button-82-shadow"></span>
                  <span class="button-82-edge"></span>
                  <span class="button-82-front text">Explore Lands</span>
                </button>
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="footer"
        style={{ fontFamily: "Raleway,fantasy", background: "#137077" }}
      >
        <div className="footer-top">
          <div className="container">
            <div>
              <div class="footer-brand">
                <ul class="contact-list">
                  <p class="footer-list-title">
                    <img src={logoImage} alt="logo" style={{ width: "80%" }} />
                  </p>
                  <li>
                    <a href="#" class="contact-link">
                      <i name="location-outline"></i>

                      <address> Rameshpuram,chenkalady,batticaloa.</address>
                    </a>
                  </li>

                  <li>
                    <a href="mailto:contact@homeverse.com" class="contact-link">
                      <i name="mail-outline"></i>

                      <span>contact@veelaanmai.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="footer-link-box">
              <ul class="footer-list">
                <li>
                  <p class="footer-list-title">Company</p>
                </li>

                <li>
                  <a href="#about" class="footer-link">
                    About
                  </a>
                </li>

                <li>
                  <a href="/cultivatione-lands-Section" class="footer-link">
                    All Cultivatione Lands
                  </a>
                </li>
              </ul>

              <ul class="footer-list">
                <li>
                  <p class="footer-list-title">Services</p>
                </li>

                <li>
                  <a href="/signin" class="footer-link">
                    Providing Land For Rent
                  </a>
                </li>

                <li>
                  <a href="/cultivatione-lands-Section" class="footer-link">
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
                  <a href="#contact" class="footer-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-bottom">
              <div className="container">
                <p className="copyright"></p>
              </div>
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

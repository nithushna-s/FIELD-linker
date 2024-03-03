import React from "react";
import { Carousel } from "react-bootstrap";
import "../Assets/CSS/WelcomeSection.css";
import heropic from "../Assets/image/field9.avif";
import home from "../Assets/image/core.jpg";
import favicon from "../Assets/image/farmer-.png";

const WelcomeSection = () => {
  return (
    <>
      <Carousel style={{ fontFamily: "Raleway", fontSize: "3em" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={heropic}
            alt="First slide"
            height={972}
            style={{ opacity: "0.8" }}
          />
          <Carousel.Caption
            className="text-center"
            style={{
              marginBottom: "10%",
              color: "#1E2C25",
              fontSize: "1.9em",
              fontfamily: "Raleway",
            }}
          >
            <h1>Discover Cultivation Lands</h1>
            <p>
              Explore our selection of cultivation lands and start your journey
              towards your dream farm.
            </p>
            <a href="/cultivatione-lands-Section">
              <button
                className="button-82-pushable"
                role="button"
                style={{ marginLeft: "45%", fontfamily: "Raleway" }}
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">View Land</span>
              </button>
            </a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={home}
            alt="Second slide"
            height={972}
            style={{ opacity: "0.8" }}
          />
          <Carousel.Caption
            className="text-center"
            style={{
              marginBottom: "10%",
              color: "#1E2C25",
              fontSize: "1.9em",
              fontfamily: "Raleway",
            }}
          >
            <h1 style={{ fontSize: "37px" }}>Post Your Cultivation Land</h1>
            <p>
              List your cultivation land for sale or rent and connect with
              potential buyers or renters.
            </p>
            <a href="/signin">
              <button
                className="button-82-pushable"
                role="button"
                style={{ marginLeft: "45%" }}
              >
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">Post Land</span>
              </button>
            </a>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div id="about"></div>
      <br />

      <section className="about">
        <h2 className="section-subtitle">About Us</h2>
        <br />
        <div className="container">
          <figure className="about-banner" style={{ marginBottom: "14%" }}>
            <img
              src={favicon}
              alt="Favicon"
              style={{ marginTop: "6%", height: "100%" }}
            />
          </figure>
          <div className="about-content">
            <h1 className=" section" style={{ textAlign: "justify" }}>
              Your Premier Marketplace for Cultivation Land Sales, Rental or
              Lease.
            </h1>
            <h3 className="about-text">
              <br />
              Seamlessly connecting cultivation landowners and seekers for a
              simplified renting and leasing experience. Your effortless journey
              into cultivating the land starts here.
            </h3>
            <br />
            <br />
            <span style={{ display: "inline-block", marginRight: "4px" }}>
              <a href="/signin">
                <button className="button-82-pushable" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">Post Land</span>
                </button>
              </a>
            </span>
            <span style={{ display: "inline-block" }}>
              <a href="/cultivatione-lands-Section">
                <button className="button-82-pushable" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front text">View Land</span>
                </button>
              </a>
            </span>
            <div id="services"> </div>
          </div>
        </div>

        <div style={{ textAlign: "center", alignItems: "center" }}>
          <h2 className="section-subtitle">
            Discover Our Exceptional Services
          </h2>
          <br />
          <br />
          <br />
          <br />
          <div className="row1">
            <div className="column1">
              <div className="card1">
                <div className="icon-wrapper">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Land Networking</h3>
                <p>
                  Seamlessly unite landowners with eager land seekers, ensuring
                  effortless transactions for both parties.
                </p>
              </div>
            </div>
            <div className="column1">
              <div className="card1">
                <div className="icon-wrapper">
                  <i className="fas fa-suitcase"></i>
                </div>
                <h3>Land Leasing and Renting</h3>
                <p>
                  Unlock opportunities for land leasing and renting, empowering
                  landowners to monetize their assets and land seekers to find
                  their ideal cultivation spaces.
                </p>
              </div>
            </div>
            <div className="column1">
              <div className="card1">
                <div className="icon-wrapper">
                  <i className="fas fa-user-tie"></i>
                </div>
                <h3>Professional Land Sales</h3>
                <p>
                  Elevate your land sales with our expert guidance. Our seasoned
                  team ensures a seamless and lucrative sale process from start
                  to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomeSection;

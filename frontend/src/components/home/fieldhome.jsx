import React from "react";
import Navbar from "./nav";
import WelcomeSection from "./WelcomeSection";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <WelcomeSection />
      <ContactForm />

      <Footer />
    </div>
  );
};

export default Home;

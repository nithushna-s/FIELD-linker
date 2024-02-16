// Home.js
import React from 'react';
import Navbar from './nav';
import WelcomeSection from '../components/WelcomeSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
const Home = () => {
  
  return (
    <div>
       <Navbar/>
      <WelcomeSection />
      <ContactForm />
  

      <Footer />

    </div>
  );
};

export default Home;

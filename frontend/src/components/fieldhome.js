// Home.js
import React from 'react';
import ParentComponent from './singin-ParentComponent';
import WelcomeSection from '../components/WelcomeSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div>
       <ParentComponent />
      <WelcomeSection />
      <ContactForm />
  

      <Footer />

    </div>
  );
};

export default Home;

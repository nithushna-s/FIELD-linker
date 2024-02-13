import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/ signup.component';
import PostAdForm from './components/PostAdForm';
import ContactForm from './components/ContactForm';
import AdminHome from './components/admin/AdminHome';
import Home from './components/fieldhome';
import AgrilandDetail from './components/AgrilandDetail ';
import AgrilandsSection from './components/AgrilandsSection';
import PaymentHead from './components/PaymentHead';
// import PaymentForm from './components/Payment';
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} /> 
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-adform" element={<PostAdForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/cultivatione-lands-Section" element={<AgrilandsSection />} />
        <Route path="/agriland/:id" element={<AgrilandDetail />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/payment" element={<PaymentHead />} />
        {/* <Route path="/pay" element={< PaymentForm/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;

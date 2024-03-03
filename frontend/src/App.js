import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/signin-signup/login.component";
import SignUp from "./components/signin-signup/ signup.component";
import AdPostingPage from "./components/post-land-ad/AdPostingPage";
import ContactForm from "./components/home/ContactForm";
import AdminHome from "./components/admin/AdminHome";
import Home from "./components/home/fieldhome";
import AgrilandDetail from "./components/landsection/AgrilandDetail ";
import AgrilandsSection from "./components/landsection/AgrilandsSection";
import PaymentHead from "./components/post-land-ad/PaymentHead";
import AdminRoute from "./components/admin/AdminRoute";
import Pay from "./components/stripe";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-adform" element={<AdPostingPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route
          path="/cultivatione-lands-Section"
          element={<AgrilandsSection />}
        />
        <Route path="/agriland/:id" element={<AgrilandDetail />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route path="/payment" element={<PaymentHead />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </Router>
  );
}

export default App;

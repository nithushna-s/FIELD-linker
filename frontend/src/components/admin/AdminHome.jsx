import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import 'chart.js/auto';

import AdminNavbar from './AdminNavbar';
import UserDetails from './UserDetails';
import AdminLandDetails from './AdminLandAdDetails';
import AdminLandRentDetails from './AdminLandRentDetails';
import CreateLand from './creatland'
import  AdminSalesList from './AdminSalesList'
import Charts from './Charts';
import SubscriptionsList from './InvoiceDetails';
const AdminHome = () => {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="/userdetailse" element={<UserDetails />} />
        <Route path="/LandDetails" element={<AdminLandDetails />} />
        <Route path="/LandRentDetails" element={<AdminLandRentDetails />} />
        <Route path="/CreateLand" element={<CreateLand />} />
        <Route path="/Dashboard" element={<Charts/>} />
        <Route path="/LandSalesList" element={< AdminSalesList/>} />
        <Route path="/PaymentsList" element= {<SubscriptionsList />}/>
      </Routes>
    </div>
  );
};

export default AdminHome;

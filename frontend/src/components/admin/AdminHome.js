import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import 'chart.js/auto';

import AdminNavbar from '../admin/AdminNavbar';
import UserDetails from '../admin/UserDetails';
import AdminLandDetails from '../admin/AdminLandAdDetails';
import AdminLandRentDetails from '../admin/AdminLandRentDetails';
import CreateLand from '../admin/creatland'
import  AdminSalesList from '../admin/AdminSalesList'
import Charts from './Charts';
import SubscriptionsList from './SubscriptionsList';
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
        <Route path="/SubscriptionsList" element= {<SubscriptionsList />}/>
      </Routes>
    </div>
  );
};

export default AdminHome;

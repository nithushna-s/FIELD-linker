import React from 'react'
import { Navigate } from 'react-router-dom';

function AdminRoute({children}) {
    let isAdmin=localStorage.getItem('isAdmin');
    console.log(isAdmin);

  return isAdmin?children:<Navigate to="/"/>
}

export default AdminRoute
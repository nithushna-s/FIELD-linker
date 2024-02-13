import React, { useState } from 'react';
import Navbar from './nav.js';

const ParentComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Logic to authenticate user
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Logic to log out user
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default ParentComponent;

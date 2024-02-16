import React, { useState } from 'react';
import PostAdForm from './PostAdForm'; 
import PaymentForm from './PaymentHead'; 

const AdPostingPage = () => {
  const [showPostAdForm, setShowPostAdForm] = useState(true); 
  const [adFormData, setAdFormData] = useState(null); 

  const handleAdFormSubmit = (formData) => {
    setAdFormData(formData);
    setShowPostAdForm(false);
  };

  return (
    <div>
      {showPostAdForm && <PostAdForm onFormSubmit={handleAdFormSubmit} />}
      {!showPostAdForm && <PaymentForm adFormData={adFormData} />}
    </div>
  );
};

export default AdPostingPage;

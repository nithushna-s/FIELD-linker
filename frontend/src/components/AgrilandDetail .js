import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import '../CSS/agrilandDetailStyles.css';
import Navbar from './nav';
import Footernext from './abouthefooter';
import RentalForm from './RentalForm'; 
import SalesForm from './SalesForm'; 

const AgrilandDetail = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/lands/${id}`);
        setLand(response.data);
      } catch (error) {
        console.error('Error fetching land details:', error);
      }
    };

    fetchLandDetails();
  }, [id]);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!land) {
    return (
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="agriland-detail-container" style={{ fontFamily: 'Raleway, fantasy', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ color: '#137077', textAlign: 'center' }}>Land Details</h2><br/>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom:'15%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',height:'60%'}}>
            {land.image && (
              <div className="img-magnifier-container">
                <img
                  id="land-image"
                  src={land.image.url}
                  alt={`Land Image of ${land.landType}`}
                  style={{ height: '42vh', width: 'auto' }}
                />
              </div>
            )}
          </div>
          <div style={{  border: '1px solid #ccc', borderRadius: '8px', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontWeight: 'bold' }}> {land.landType}</p>
            <p style={{ textAlign: 'justify' }}>{land.location}</p>
            <span>
              <p>{land.rentOrLease} {land.landSize} {land.rentOrLeasePrice}</p>
            </span>
            <p>Utilities</p>
            <p>Water Details: {land.waterDetails}</p>
            <p>Electricity: {land.electricityStatus}</p>
            </div>
            <p style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>Description: {land.otherDetails}</p>
            <button className="button-82-pushable" role="button" onClick={handleButtonClick} style={{ marginLeft: '20%', textAlign: 'center', width: '60%' }}>
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Contact Now</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Contact Form Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {(land.rentOrLease === 'Rent' || land.rentOrLease === 'Lease') ? (
          <RentalForm landId={id} onCloseModal={handleCloseModal} />
        ) : (
          <SalesForm landId={id} onCloseModal={handleCloseModal} />
        )}
      </Modal>
      <Footernext />
    </>
  );
};

export default AgrilandDetail;

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
    return <div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>;
  }

  return (
    <>
      <Navbar />
      <div className="agriland-detail-container" style={{ fontFamily: 'sans-serif', alignItems: 'center' }}>
        <h2 style={{ color: '#137077', textAlign: 'center' }}>Land Details</h2> <br />

        {land.image && (
          <div>
            <div className="img-magnifier-container">
              <img
                id="land-image"
                src={land.image.url}
                alt={`Land Image of ${land.landType}`}
                style={{ height: '30vh' }}
              />
            </div>
          </div>
        )}

        <p>Crop Types{land.landType}</p>
        <p style={{ textAlign: 'justify' }}>{land.location}</p>
        <span>
          <p>{land.rentOrLease} {land.landSize} {land.rentOrLeasePrice}</p>
        </span>
        <p> Utilities </p>
        <p>{land.waterDetails}</p>
        <p>Electricity {land.electricityStatus}</p>
        <p>Description {land.otherDetails}</p>

        {/* <button
          onClick={handleButtonClick}
          className="view-form-button"
          style={{ background: '#137077', color: 'white', padding: '5px 15px', marginLeft: '80%' }}
        > */}
         <button class="button-82-pushable" role="button"   onClick={handleButtonClick}   style={{ marginLeft: '20%',textAlign:'center',width:'60%' }}
>
<span class="button-82-shadow"></span>
<span class="button-82-edge"></span>
<span class="button-82-front text">
Contact Now</span>
</button> 
          
        {/* </button> */}

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
      </div>
      <Footernext />
    </>
  );
};

export default AgrilandDetail;

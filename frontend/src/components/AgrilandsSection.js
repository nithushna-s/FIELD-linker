import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/agrilandssectione.css';
import Navbar from './nav';
import Footernext from './abouthefooter';

const AgrilandsSection = () => {
  const [agrilands, setAgrilands] = useState([]);
  const [filters, setFilters] = useState({
    landType: null,
    rentOrLease: null,
    location: null,
    rentOrLeasePrice: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgrilands = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:7000/api/lands', {
          params: filters,
        });

        const landsArray = response.data;

        if (Array.isArray(landsArray)) {
          setAgrilands(landsArray);
        } else {
          console.error('Data received is not an array:', landsArray);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching agrilands. Please try again later.');
        console.error('Error fetching agrilands:', error);
      }
    };

    fetchAgrilands();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '8%', textAlign: 'start', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontFamily: 'revert', color: '#137077', textAlign: 'center' }}>Discover Cultivation Lands</h2>
        <br /> <br />

        {/* Filter Form */}
        <div className="filter-form">
          <label htmlFor="landType">Crop Types:</label>
          <select id="landType" onChange={(e) => handleFilterChange('landType', e.target.value)}>
            <option value="">All</option>
            <option value="Groundnut Cropland">Groundnut Cropland</option>
            <option value="Paddy">Paddy</option>
          </select>

          <label htmlFor="rentOrLease">Rent, Sale or Lease:</label>
          <select id="rentOrLease" onChange={(e) => handleFilterChange('rentOrLease', e.target.value)}>
            <option value="">All</option>
            <option value="Rent">Rent</option>
            <option value="Lease">Lease</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        {loading && <div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>}
        {error && (
          <p style={{ color: '#FF0000', textAlign: 'center', marginTop: '10%', fontSize: '2em' }}>{error}</p>
        )}

        <div className="row">
          {agrilands.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: '#FF0000', marginTop: '10%', paddingBottom:'15%' ,fontSize: '2em' }}>  Not found.</p>
          )}

          {agrilands.map((land) => (
            <div key={land._id} className="col-md-4 mb-4">
              <div className="card" style={{ maxHeight: '600px', objectFit: 'cover', width: '90%' }}>
                <Link to={`/agriland/${land._id}`} style={{ textDecoration: 'none' }}>
                  {land.image && (
                    <div className="image-container">
                      <img
                        src={land.image.url}
                        className="card-img-top"
                        alt="Land Image"
                        style={{
                          maxHeight: '200px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          width: '100%',
                          borderRadius: '8px 8px 0 0',
                        }}
                      />
                      <div className="overlay">
                        <Link to={`/agriland/${land._id}`} className="view-details-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{land.landType}</h5>
                  <p className="card-text">{land.rentOrLease}</p>
                  <p className="card-text">{land.location}</p>
                  <p className="card-text">Land Size: {land.landSize}</p>
                  <p className="card-text">Price: {land.rentOrLeasePrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footernext />
    </>
  );
};

export default AgrilandsSection;

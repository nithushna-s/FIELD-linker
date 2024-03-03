import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/assets/css/AdminLandDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminLandDetails = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [updateData, setUpdateData] = useState({ imageFile: null });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:7001/api/landsadmin', { withCredentials: true })
      .then(response => {
        const reversedLands = response.data.reverse();
        setLands(reversedLands);
      })
      .catch(error => console.error('Error fetching land data:', error));
  }, []);

  const handleEdit = (land) => {
    setSelectedLand(land);
    setUpdateData({ imageFile: null });
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    if (!selectedLand || !isEditMode) {
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          formData.append(key, value);
        }
      });

      if (updateData.imageFile) {
        formData.append('image', updateData.imageFile);
      }

      const response = await axios.put(
        `http://localhost:7001/api/lands/${selectedLand._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const updatedLands = lands.map(l => (l._id === selectedLand._id ? response.data : l));
      setLands(updatedLands);
      setSelectedLand(null);
      setUpdateData({ imageFile: null });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating land:', error);
    }
  };

  const handleDelete = async (landId) => {
    try {
      const response = await axios.patch(`http://localhost:7001/api/lands/${landId}`, { withCredentials: true });
      const updatedLands = lands.map(l => (l._id === landId ? response.data : l));
      setLands(updatedLands);
      setDeleteConfirmationId(null); // Reset delete confirmation ID after successful delete
    } catch (error) {
      console.error('Error soft deleting land:', error);
    }
  };

  const filteredLands = lands.filter((land) =>
    land._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancel = () => {
    setSelectedLand(null);
    setUpdateData({ imageFile: null });
    setIsEditMode(false);
  };

  return (
    <div className="admin-land-details">
      <div className="search-bar-container" style={{ marginLeft: '67%', marginTop: '7%' }}>
        <button style={{ backgroundColor: '#137077', border: 'none', cursor: 'pointer' }}>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginLeft: '10%' }}
          />
          <FontAwesomeIcon icon={faSearch} style={{ color: 'white', paddingLeft: '10px' }} />
        </button>
        <a href='/admin/CreateLand'>
          <button style={{ backgroundColor: '#1E2C25', color: 'white', padding: '10px 35px', border: 'none', cursor: 'pointer', marginLeft: '15px', marginTop: '40px' }}>
            Create
          </button>
        </a>
      </div>
      <table className="land-details-table" style={{ overflow: 'auto', maxHeight: '100px' }}>
        <thead>
          <tr>
            <th style={{ width: '1%' }}>Number</th>
            <th style={{ width: '1%' }}>ID</th>
            <th>Crop Types</th>
            <th>RentOrLease</th>
            <th>Land Size</th>
            <th>Image</th>
            <th>Status</th>
            <th>Pay</th>
            <th>Timestamp</th>
            <th>Actions</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {filteredLands.map((land, index) => (
            <React.Fragment key={land._id}>
              <tr>
                <td>{filteredLands.length - index}</td>
                <td>{land._id}</td>
                <td>{land.landType}</td>
                <td>{land.rentOrLease}</td>
                <td>{land.landSize}</td>
                <td className='img'>{land.image && <img src={land.image.url} alt="Land" />}</td>
                <td>{land.status}</td>
                <td>{land.Pay}</td>
                <td>{land.timestamps}</td>
                <td>
                  {!isEditMode && (
                    <div style={{ display: 'inline' }}>
                      <button onClick={() => handleEdit(land)} style={{ backgroundColor: land.ispost ? '#167370' : '#8ECBC9', color: 'white', padding: '3px 5px', border: 'none', cursor: 'pointer', width: '100px', display: 'inline' }}>
                        {land.ispost ? 'Post' : 'Not Post'}
                      </button>
                      {land.ispost && (
                        <button onClick={() => setDeleteConfirmationId(land._id)} style={{ marginRight: '5px', display: 'inline',color:'#ff5252' }}>
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => setExpandedRows(prevExpandedRows => [...prevExpandedRows, index])}
                    style={{
                      backgroundColor: expandedRows.includes(index) ? '#137077' : '#1E2C25',
                      color: 'white',
                      padding: '5px 26px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    More
                  </button>
                </td>
              </tr>
              {expandedRows.includes(index) && (
                <tr>
                  <td colSpan="11">
                    <div className="popup-container" style={{ position: 'fixed', zIndex: '1', left: '0', top: '0', width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                      <div className="popup" style={{ margin: '15% auto', padding: '20px', border: '1px solid #888', width: '30%', height: '100vh' }}>
                        <div className="content" style={{ width: '300vw' }}>
                          <span className="close" style={{ color: '#1E2C25', fontSize: '3em', float: 'right' }} onClick={() => setExpandedRows(prevExpandedRows => prevExpandedRows.filter(row => row !== index))}>&times;</span>
                          <p style={{ marginTop: '10px' }}><strong>Price:</strong> {land.rentOrLeasePrice}</p>
                          <p ><strong>Land Location:</strong> {land.location}</p>
                          <p><strong>Water Details:</strong> {land.waterDetails}</p>
                          <p><strong>Electricity Status:</strong> {land.electricityStatus}</p>
                          <p><strong>Other Details:</strong> {land.otherDetails}</p>
                          <p><strong>Name:</strong> {land.name}</p>
                          <p><strong>Email:</strong> {land.email}</p>
                          <p><strong>Phone Numbers:</strong> {land.phoneNumbers}</p>
                          <p><strong>Other Numbers:</strong> {land.OtherNumbers}</p>
                          <p><strong>Address:</strong> {land.address}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {deleteConfirmationId && (
        <div className="popup-container">
          <div className="popup">
            <p style={{fontSize:'1.5em'}}>Are you sure you want to <span style={{color:'#ff5252',display:'inline'}}>Remove </span>  this land?</p>
            <div style={{display:'flex'}}>
              <button onClick={() => handleDelete(deleteConfirmationId)} className='btn'>Yes</button>
              <button onClick={() => setDeleteConfirmationId(null)} className='btn' style={{background:'black'}}>No</button>
            </div>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="popup-container">
          <div className="popup">
            <form>
              <span className="close" style={{ color: '#1E2C25', fontSize: '3em', float: 'right', marginLeft: '50%' }} onClick={handleCancel}>&times;</span>
              <h2>Post</h2>
              <div className="form-row  editeform">
                <label htmlFor="otherDetails">Description:</label>
                <input
                  type="text"
                  id="otherDetails"
                  className="form-input"
                  value={updateData.otherDetails || selectedLand?.otherDetails || ''}
                  onChange={(e) => setUpdateData({ ...updateData, otherDetails: e.target.value })}
                  style={{ height: '7vh' }}
                />
              </div><br />
              <div className="form-row editeform">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  className="form-select"
                  value={updateData.status || selectedLand?.status || ''}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  style={{ height: '7vh' }}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div><br />
              <div>
                <label htmlFor="isPost">Post:</label>
                <input
                  type="checkbox"
                  id="isPost"
                  className="form-checkbox"
                  checked={updateData.ispost || selectedLand?.ispost || false}
                  onChange={(e) => setUpdateData({ ...updateData, ispost: e.target.checked })}
                  style={{ height: '8vh', width: '10%', display: 'inline-block', align: 'right' }}
                />
              </div>
              <button onClick={handleUpdate} style={{ display: 'inline-block', marginLeft: '' }}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLandDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/assets/css/AdminLandDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminLandDetails = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [updateData, setUpdateData] = useState({ imageFile: null });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:7000/api/landsadmin')
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
  
      // Append other updateData properties to formData
      Object.entries(updateData).forEach(([key, value]) => {
        if (key !== 'imageFile') {
          formData.append(key, value);
        }
      });
  
      // Check if imageFile is present and append it to formData
      if (updateData.imageFile) {
        formData.append('image', updateData.imageFile);
      }
  
      const response = await axios.put(
        `http://localhost:7000/api/lands/${selectedLand._id}`,
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
      if (window.confirm('Are you sure you want to soft delete this land?')) {
        const response = await axios.patch(`http://localhost:7000/api/lands/${landId}`);
        const updatedLands = lands.map(l => (l._id === landId ? response.data : l));
        setLands(updatedLands);
      }
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
  const handleCreateLand = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/lands', {
        landType: updateData.landType,
        rentOrLease: updateData.rentOrLease,
        location: updateData.location,
        landSize: updateData.landSize,
        rentOrLeasePrice: updateData.rentOrLeasePrice,
        waterDetails: updateData.waterDetails,
        electricityStatus: updateData.electricityStatus,
        otherDetails: updateData.otherDetails,
        image: updateData.imageFile,
        name: updateData.name,
        email: updateData.email,
        phoneNumbers: updateData.phoneNumbers,
        OtherNumbers: updateData.OtherNumbers,
        address: updateData.address,
        ispost: updateData.ispost || false,
      });

      setLands([...lands, response.data]);
      setUpdateData({ imageFile: null });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error creating land:', error);
    }
  };

 
    
  return (
    <div className="admin-land-details">
      <h2 className='h1' style={{textAlign:'center'}}>Land Details</h2>
     
      <div className="search-bar-container" style={{marginLeft:'60%'}}>
     
     <button  style={{ backgroundColor: 'darkblue', border: 'none', cursor: 'pointer' ,}}>
     <input
     type="text"
     placeholder="Search by ID"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     style={{marginLeft:'10%'}}
   />
       <FontAwesomeIcon icon={faSearch} style={{ color: 'white',paddingLeft:'10px'}}      onChange={(e) => setSearchTerm(e.target.value)}
 />
     </button>
    

        <a href='/admin/CreateLand'>
        <button  style={{ backgroundColor: 'green', color: 'white',  padding: '10px 35px', border: 'none', cursor: 'pointer', marginLeft:'15px' ,marginTop:'40px'}}>
               Create 
             </button>
        </a>
      </div>
      <table className="land-details-table" style={{ overflow: 'auto', maxHeight: '100px' }}>
        <thead>
          <tr>
          <th>Number</th>
            <th>ID</th>
            <th>Crop Types</th>
            <th>rentOrLease</th>
            <th>Location</th>
            <th>Land Size</th>
            <th>Rent/Lease Price</th>
            <th>Water Details</th>
            <th>Electricity Status</th>
            <th>Other Details</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Numbers</th>
            <th>Other Numbers</th>
            <th>Address</th>
            <th>Timestamp</th>
            <th>Admin-Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLands.map((land ,index)=> (
            <tr key={land._id}>
                <td>{filteredLands.length - index}</td>
              <td>{land._id}</td>
              <td>{land.landType}</td>
              <td>{land. rentOrLease}</td>
              <td>{land.location}</td>
              <td>{land.landSize}</td>
              <td>{land.rentOrLeasePrice}</td>
              <td>{land.waterDetails}</td>
              <td>{land.electricityStatus}</td>
              <td>{land.otherDetails}</td>
              <td className='img'>{land.image && <img src={land.image.url} alt="Land" />}</td>
              <td>{land.name}</td>
              <td>{land.email}</td>
              <td>{land.phoneNumbers}</td>
              <td>{land.OtherNumbers}</td>
              <td>{land.address}</td>
              <td>{land.timestamps}</td>
              <td>{land.ispost}</td>
              <td>
                <button onClick={() => handleEdit(land)} className="btn btn-primary">Edit</button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this land?')) {
                      handleDelete(land._id);
                    }
                  }}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditMode && (
  <div className="popup-container">
    <div className="popup">
      
      <form>
      <h2>Edit Land</h2>
      <div className="column">
        <label>Crop Types:</label>
        <input
          type="text"
          value={updateData.landType || selectedLand?.landType || ''}
          onChange={(e) => setUpdateData({ ...updateData, landType: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Sale,Rent or Lease:</label>
        <input
          type="text"
          value={updateData. rentOrLease|| selectedLand?.rentOrLease || ''}
          onChange={(e) => setUpdateData({ ...updateData, rentOrLease: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Location:</label>
        <input
          type="text"
          value={updateData.location || selectedLand?.location || ''}
          onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Land Size:</label>
        <input
          type="text"
          value={updateData.landSize || selectedLand?.landSize || ''}
          onChange={(e) => setUpdateData({ ...updateData, landSize: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Rent/Lease Price:</label>
        <input
          type="text"
          value={updateData.rentOrLeasePrice || selectedLand?.rentOrLeasePrice || ''}
          onChange={(e) => setUpdateData({ ...updateData, rentOrLeasePrice: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Water Details:</label>
        <input
          type="text"
          value={updateData.waterDetails || selectedLand?.waterDetails || ''}
          onChange={(e) => setUpdateData({ ...updateData, waterDetails: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Electricity Status:</label>
        <input
          type="text"
          value={updateData.electricityStatus || selectedLand?.electricityStatus || ''}
          onChange={(e) => setUpdateData({ ...updateData, electricityStatus: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Other Details:</label>
        <input
          type="text"
          value={updateData.otherDetails || selectedLand?.otherDetails || ''}
          onChange={(e) => setUpdateData({ ...updateData, otherDetails: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Image:</label>
        {selectedLand?.image && <img src={selectedLand?.image} alt="Land" />}
        <input
          type="file"
          accept="image/*"
        />
        {updateData.imagePreview && (
          <img src={updateData.imagePreview} alt="Preview" />
        )}
      </div>
      <div className="column">
        <label>Name:</label>
        <input
          type="text"
          value={updateData.name || selectedLand?.name || ''}
          onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Email:</label>
        <input
          type="text"
          value={updateData.email || selectedLand?.email || ''}
          onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Phone Numbers:</label>
        <input
          type="text"
          value={updateData.phoneNumbers || selectedLand?.phoneNumbers || ''}
          onChange={(e) => setUpdateData({ ...updateData, phoneNumbers: e.target.value })}
        />
      </div>
      <div className="column">
        <label> OtherNumbers:</label>
        <input
          type="text"
          value={updateData.OtherNumbers || selectedLand?.OtherNumbers || ''}
          onChange={(e) => setUpdateData({ ...updateData, OtherNumbers: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Address:</label>
        <input
          type="text"
          value={updateData.address || selectedLand?.address || ''}
          onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
        />
      </div>
      <div className="column">
        <label>Post:</label>
        <input
  type="checkbox"
  checked={updateData.ispost || selectedLand?.ispost || false}
  onChange={(e) => setUpdateData({ ...updateData, ispost: e.target.checked })}
/>

      </div>
     
      <button onClick={handleUpdate}>Save Changes</button> 
      <button onClick={handleCancel} className="btn cancel-button">
    Cancel
  </button> 
  </form>    
    </div>
  </div>
)}

      
    </div>
  );
};

export default AdminLandDetails;
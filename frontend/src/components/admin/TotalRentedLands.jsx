import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalRentedLands = () => {
  const [totalRentedLands, setTotalRentedLands] = useState(0);

  useEffect(() => {
    const fetchTotalRentedLands = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/lands',{withCredentials:true}, {
          params: { rentOrLease: 'rent' },
        });
        setTotalRentedLands(response.data.length);
      } catch (error) {
        console.error('Error fetching total rented lands:', error);
      }
    };

    fetchTotalRentedLands();
  }, []);

  return (
    <div>
      <h2>Total Rented Lands</h2>
      <p>{totalRentedLands}</p>
    </div>
  );
};

export default TotalRentedLands;

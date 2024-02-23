import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const Charts = () => {
  const [userData, setUserData] = useState({});
  const [landPostData, setLandPostData] = useState({});
  const [rentDetailsData, setRentDetailsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:7000/api/users',{withCredentials:true});
        setUserData(userResponse.data);

        const landPostResponse = await axios.get('http://localhost:7000/api/lands',{withCredentials:true}, {
          params: { ispost: true },
        });
        setLandPostData(landPostResponse.data);

        const rentDetailsResponse = await axios.get('http://localhost:7000/api/lands',{withCredentials:true}, {
          params: { rentOrLease: 'rent' },
        });
        setRentDetailsData(rentDetailsResponse.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const getUserChartData = () => {
    return {
      labels: ['Active Users', 'Inactive Users'],
      datasets: [
        {
          data: [userData.activeUsersCount || 0, userData.inactiveUsersCount || 0],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  };

  const getLandPostChartData = () => {
    return {
      labels: ['Total Land Posts', 'Not Posted'],
      datasets: [
        {
          data: [landPostData.totalLandPosts || 0, landPostData.notPostedLandPosts || 0],
          backgroundColor: ['#FFCE56', '#FF6384'],
        },
      ],
    };
  };

  const getRentDetailsChartData = () => {
    return {
      labels: ['Total Rent Details', 'Not Rented'],
      datasets: [
        {
          data: [rentDetailsData.totalRentDetails || 0, rentDetailsData.notRentedDetails || 0],
          backgroundColor: ['#4CAF50', '#FF6384'],
        },
      ],
    };
  };

  return (
    <div>
      <h2>User Chart</h2>
      <Doughnut data={getUserChartData()} />

      <h2>Land Post Chart</h2>
      <Doughnut data={getLandPostChartData()} />

      <h2>Rent Details Chart</h2>
      <Doughnut data={getRentDetailsChartData()} />
    </div>
  );
};

export default Charts;

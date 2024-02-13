import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalPosts = () => {
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/lands', {
          params: { ispost: true },
        });
        setTotalPosts(response.data.length);
      } catch (error) {
        console.error('Error fetching total posts:', error);
      }
    };

    fetchTotalPosts();
  }, []);

  return (
    <div>
      <h2>Total Posts</h2>
      <p>{totalPosts}</p>
    </div>
  );
};

export default TotalPosts;

import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/customers')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error to find data", error);
        setError("Error to find data");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Backend data</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && data && (
       <ul>
       {data.map((item, index) => (
         <li key={index}>
           <p>Name: {item.name}</p>
           <p>Email: {item.email}</p>
           <p>Phone: {item.phone}</p>
         </li>
       ))}
     </ul>
     
      )}
    </div>
  );
};

export default Home;


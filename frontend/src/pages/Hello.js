import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Hello = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/customers/hello')
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
        <p>{data}</p> // Exibe a string diretamente
      )}
    </div>
  );
};

export default Hello;
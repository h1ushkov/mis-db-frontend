import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelStatistics = () => {
  const [modelCount, setModelCount] = useState({});
  const [modelAveragePrice, setModelAveragePrice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModelStatistics();
  }, []);

  const fetchModelStatistics = async () => {
    try {
      setLoading(true);

      const modelCountResponse = await axios.get('http://localhost:8080/statistics/model-count');
      const modelAveragePriceResponse = await axios.get('http://localhost:8080/statistics/model-average-price');

      setModelCount(modelCountResponse.data);
      setModelAveragePrice(modelAveragePriceResponse.data);

      setLoading(false);
    } catch (error) {
      setError(`Error fetching model statistics: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Model Statistics</h4>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Count of Parts</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(modelCount).map(([model, count]) => (
            <tr key={model}>
              <td>{model}</td>
              <td>{count}</td>
              <td>{modelAveragePrice[model]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelStatistics;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManufacturerStatistics = () => {
  const [manufacturerCount, setManufacturerCount] = useState({});
  const [manufacturerAveragePrice, setManufacturerAveragePrice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchManufacturerStatistics();
  }, []);

  const fetchManufacturerStatistics = async () => {
    try {
      setLoading(true);

      const manufacturerCountResponse = await axios.get('http://localhost:8080/statistics/manufacturer-count');
      const manufacturerAveragePriceResponse = await axios.get('http://localhost:8080/statistics/manufacturer-average-price');

      setManufacturerCount(manufacturerCountResponse.data);
      setManufacturerAveragePrice(manufacturerAveragePriceResponse.data);

      setLoading(false);
    } catch (error) {
      setError(`Error fetching manufacturer statistics: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Manufacturer Statistics</h4>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Count of Parts</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(manufacturerCount).map(([manufacturer, count]) => (
            <tr key={manufacturer}>
              <td>{manufacturer}</td>
              <td>{count}</td>
              <td>{manufacturerAveragePrice[manufacturer]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerStatistics;

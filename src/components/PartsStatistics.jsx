import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartsStatistics = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      const totalCountResponse = await axios.get('http://localhost:8080/statistics/total-count');
      const averagePriceResponse = await axios.get('http://localhost:8080/statistics/average-price');
      const totalSumResponse = await axios.get('http://localhost:8080/statistics/total-sum');

      setTotalCount(totalCountResponse.data);
      setAveragePrice(averagePriceResponse.data);
      setTotalSum(totalSumResponse.data);

      setLoading(false);
    } catch (error) {
      setError(`Error fetching statistics: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Common parts statistics</h4>

      {loading && <p>Loading...</p>}
      
      {error ? (
        <p style={{ color: 'red' }}>Error fetching statistics: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Count of Parts</td>
              <td>{totalCount}</td>
            </tr>
            <tr>
              <td>Average Price of Parts</td>
              <td>{averagePrice}</td>
            </tr>
            <tr>
              <td>Total Sum of Prices</td>
              <td>{totalSum}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PartsStatistics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceRangeStatistics = () => {
  const [priceRanges, setPriceRanges] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPriceRanges();
  }, []);

  const fetchPriceRanges = async () => {
    try {
      setLoading(true);

      const priceRangesResponse = await axios.get('http://localhost:8080/statistics/price-ranges');
      setPriceRanges(priceRangesResponse.data);

      setLoading(false);
    } catch (error) {
      setError(`Error fetching price range statistics: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Price Range Statistics</h4>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Price Range</th>
            <th>Number of Parts</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(priceRanges).map(([rangeLabel, count]) => (
            <tr key={rangeLabel}>
              <td>{rangeLabel}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceRangeStatistics;
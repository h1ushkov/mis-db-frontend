import React, { useState } from 'react';
import axios from 'axios';

const AvailabilityFilter = () => {
  const [count, setCount] = useState(0);
  const [filteredParts, setFilteredParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilter = (filterType) => {
    setLoading(true);
    setError(null);

    // Input validation
    if (isNaN(count) || count < 0) {
      setError('Invalid numeric input');
      setLoading(false);
      return;
    }

    const endpoint = filterType === 'is-null-or-empty'
      ? 'http://localhost:8080/parts/availability/is-null-or-empty'
      : `http://localhost:8080/parts/availability/${filterType}/${count}`;

    axios.get(endpoint)
      .then(response => {
        setFilteredParts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Error filtering parts: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div>
      <label>
        Count:
        <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
      </label>
      <button onClick={() => handleFilter('greater-than')}>Запчастини яких більше введеного значення на складі</button>
      <button onClick={() => handleFilter('is-null-or-empty')}>Запчастини яких немає на складі</button>
      <button onClick={() => handleFilter('less-than')}>Запчастини яких менше введеного значення на складі</button>

      {/* Display loading state or error message */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the filtered parts in a table */}
      {filteredParts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map(part => (
              <tr key={part.id}>
                <td>{part.id}</td>
                <td>{part.Name}</td>
                <td>{part.Availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailabilityFilter;

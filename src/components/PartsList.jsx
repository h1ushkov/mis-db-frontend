import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const PartsList = () => {
  const [parts, setParts] = useState([]);
  const [showId, setShowId] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/parts');
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/parts/${id}`);
      console.log(`Deleted part with id ${id}`);
      // Update the parts list after deletion
      fetchParts();
    } catch (error) {
      console.error(`Error deleting part with id ${id}:`, error);
    }
  };

  const handleCellValueChange = (value, rowIndex, colKey) => {
    // Update the state without triggering a re-render
    setParts((prevParts) => {
      const updatedParts = prevParts.map((part, index) =>
        index === rowIndex ? { ...part, [colKey]: value } : part
      );
      saveChanges(updatedParts[rowIndex]);
      return updatedParts;
    });
  };

  const saveChanges = async (editedPart) => {
    try {
      await axios.put(`http://localhost:8080/parts/${editedPart.id}`, editedPart);
      console.log('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {showId && <th>ID</th>}
          <th>OldCode</th>
          <th>P1P2P3</th>
          <th>FinishAndProducer</th>
          <th>Model</th>
          <th>Name</th>
          <th>Price</th>
          <th>Availability</th>
          <th></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {parts.map((part, rowIndex) => (
          <tr key={part.id}>
            {showId && <td>{part.id}</td>}
            {['OldCode', 'P1P2P3', 'FinishAndProducer', 'Model', 'Name', 'Price', 'Availability'].map(key => (
              <td key={key}>
                <div
                  contentEditable={editMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleCellValueBlur(e.target.textContent, rowIndex, key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                >
                  {part[key]}
                </div>
              </td>
            ))}
            <td>
              <button onClick={() => handleDelete(part.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };
  const handleCellValueBlur = (value, rowIndex, colKey) => {
    // Update the state without triggering a re-render
    setParts((prevParts) => {
      const updatedParts = prevParts.map((part, index) =>
        index === rowIndex ? { ...part, [colKey]: value } : part
      );
      saveChanges(updatedParts[rowIndex]);
      return updatedParts;
    });
  };
  return (
    <div>
      <center><h3>Parts List</h3></center>
      <label>
        Show ID
        <input type="checkbox" checked={showId} onChange={() => setShowId(!showId)} />
      </label>
      <button onClick={toggleEditMode}>
        {editMode ? 'VISUAL MODE' : 'EDIT MODE'}
      </button>
      <table className={editMode ? 'edit-mode' : ''}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};


export default PartsList;

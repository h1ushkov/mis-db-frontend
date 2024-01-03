import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const PartsList = () => {
  const [parts, setParts] = useState([]);
  const [editablePart, setEditablePart] = useState(null);
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

  const handleEdit = (part) => {
    setEditablePart(part);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/parts/${editablePart.id}`, editablePart);
      // Clear the editable part after saving changes
      setEditablePart(null);
      // Update the parts list after editing
      fetchParts();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <tr key={part.id}>
              {showId && <td>{part.id}</td>}
              {['OldCode', 'P1P2P3', 'FinishAndProducer', 'Model', 'Name', 'Price', 'Availability'].map(key => (
                <td
                  key={key}
                  contentEditable={editMode && editablePart && editablePart.id === part.id}
                  onInput={(e) => setEditablePart({ ...part, [key]: e.target.textContent })}
                >
                  {part[key]}
                </td>
              ))}
              <td>
                {editMode && editablePart && editablePart.id === part.id ? (
                  <button onClick={handleSaveChanges}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(part)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button onClick={() => handleDelete(part.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartsList;

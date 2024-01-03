import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartsList from './PartsList';
import PartForm from './PartsForm';
import Dashboard from './Dashboard';
const App = () => {
  const [parts, setParts] = useState([]);
  const [editablePart, setEditablePart] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedStat, setSelectedStat] = useState(null);
  const [n, setN] = useState(0);

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

  const handleEdit = (part) => {
    setEditablePart(part);
    setFormData(part);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/parts/${editablePart.id}`, editablePart);
      setEditablePart(null);
      fetchParts();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCreatePart = async () => {
    try {
      await axios.post('http://localhost:8080/parts', formData);
      setFormData({
      });
      fetchParts();
    } catch (error) {
      console.error('Error creating part:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatButtonClick = (stat) => {
    setSelectedStat(stat);
    if (stat) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        const newUrl = `/parts/availability/${stat}/${n}`;
        newWindow.location.href = newUrl;
      }
    }
  };

  const handleNChange = (e) => {
    setN(parseInt(e.target.value, 10));
  };

  return (
    <div>
     <center><h2>Parts Management</h2></center>
      <PartForm
        onSubmit={editablePart ? handleSaveChanges : handleCreatePart}
        editMode={!!editablePart}
        formData={formData}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}
      />
<Dashboard/>
      <PartsList parts={parts} onEdit={handleEdit} />
    </div>
  );
};

export default App;

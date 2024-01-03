import React from 'react';

const PartForm = ({ onSubmit, editMode, formData, onInputChange, onSaveChanges }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <strong>OldCode:</strong><br></br>
        <input
          type="text"
          name="OldCode"
          value={formData.OldCode}
          onChange={onInputChange}
        />
      </label><br></br>
      <label>
        <strong>P1P2P3:</strong><br></br>
        <input
          type="text"
          name="P1P2P3"
          value={formData.P1P2P3}
          onChange={onInputChange}
        />
      </label><br></br>
      {/* Include other input fields as needed */}
      <label>
        <strong>Name:</strong><br></br>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={onInputChange}
        />
      </label><br></br>
      <label>
        <strong>Manufacturer:</strong><br></br>
        <input
          type="text"
          name="FinishAndProducer"
          value={formData.FinishAndProducer}
          onChange={onInputChange}
        />
      </label><br></br>
      <label>
        <strong>Model:</strong><br></br>
        <input
          type="text"
          name="Model"
          value={formData.Model}
          onChange={onInputChange}
        />
      </label><br></br>
      <label>
        <strong>Price:</strong><br></br>
        <input
          type="text"
          name="Price"
          value={formData.Price}
          onChange={onInputChange}
        />
      </label><br></br>
      <label>
      <strong>Availability:</strong><br></br>
      <input
          type="text"
          name="Availability"
          value={formData.Availability}
          onChange={onInputChange}
        />
      </label><br></br>

      {/* Add input fields for other properties of PartsDTO */}
      
      {editMode ? (
        <button type="button" onClick={onSaveChanges}>
          Save Changes
        </button>
      ) : (
        <button type="submit">Add new</button>
      )}
    </form>
  );
};

export default PartForm;
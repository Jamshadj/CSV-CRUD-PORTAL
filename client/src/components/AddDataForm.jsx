import React, { useState } from 'react';
import { postData } from '../api/api';

function AddDataForm() {
  const [formData, setFormData] = useState({
    column1: '', // Initialize your form fields with empty strings or default values
    column2: '',
    column3: '',
    column4: '',
    column5: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to add data with formData
    postData(formData)
      .then((response) => {
        // Handle success, reset the form after successful submission
        setFormData({
          column1: '',
          column2: '',
          column3: '',
          column4: '',
          column5: ''
        });
        console.log('Record added successfully:', response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding record:', error);
      });
  };

  return (
    <div className="add-data-form">
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Column 1:</label>
          <input
            type="text"
            name="column1"
            value={formData.column1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Column 2:</label>
          <input
            type="text"
            name="column2"
            value={formData.column2}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Column 3:</label>
          <input
            type="text"
            name="column3"
            value={formData.column3}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Column 4:</label>
          <input
            type="text"
            name="column4"
            value={formData.column4}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Column 5:</label>
          <input
            type="text"
            name="column5"
            value={formData.column5}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddDataForm;

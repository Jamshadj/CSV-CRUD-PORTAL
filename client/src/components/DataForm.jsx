import React, { useState } from 'react';
import { addData } from '../services/api';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function from uuid library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDataForm() {
  const [formData, setFormData] = useState({
    id: uuidv4(), // Generate a unique ID when the component is initialized
    Name: '',
    Age: '',
    City: '',
    Email: '',
    'Phone Number': ''
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
    addData(formData)
      .then((response) => {
        // Handle success, reset the form after successful submission
        setFormData({
          id: uuidv4(), // Generate a new unique ID for the next data item
          Name: '',
          Age: '',
          City: '',
          Email: '',
          'Phone Number': ''
        });
        toast.success('Record added successfully!');
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding record:', error);
        toast.error('Error adding record. Please try again.'); 
      });
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Name"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Age">
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Age"
            type="text"
            placeholder="Age"
            name="Age"
            value={formData.Age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="City">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="City"
            type="text"
            placeholder="City"
            name="City"
            value={formData.City}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="email"
            placeholder="Email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Phone"
            type="text"
            placeholder="Phone Number"
            name="Phone Number"
            value={formData['Phone Number']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDataForm;

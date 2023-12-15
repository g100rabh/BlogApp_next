'use client'

import React, { useState } from 'react';
import validator from 'validator';

export type showDetails = {
  showName: string;
  showType: string;
  showDateAndTime: string;
  noOfTickets:string | undefined;
};



const ShowDetails = ({onSubmit}) => {
  const [formData, setFormData] = useState<showDetails
>({
    showName: '', 
    showType: '',
    showDateAndTime: '',
    noOfTickets: undefined,
  });

  const [errors, setErrors] = useState<showDetails
>({
    showName: '',
    showType: '',
    showDateAndTime: '',
    noOfTickets: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const sanitizedValue = name === 'noOfTickets' ? value.replace(/[^0-9]/g, '') : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log("Submit button clicked"); 

      const validationErrors:showDetails = {
           };

      if (!validator.isLength(formData.showName, { min: 1 })) {
        validationErrors.showName = 'Show Name is required.';
      }

      if (!validator.isLength(formData.showType, { min: 1 })) {
        validationErrors.showType = 'Show Type is required.';
      }

      if (!validator.isISO8601(formData.showDateAndTime)) {
        validationErrors.showDateAndTime = 'Valid date and time are required.';
      }

      if (!validator.isInt(`${formData.noOfTickets}`)) {
        validationErrors.noOfTickets = 'Number of required..';
      }
      

      setErrors(validationErrors);

      console.log((Object.keys(validationErrors)),"ssssssssss")

      if (Object.keys(validationErrors).length === 0) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}T${hours}:${minutes}`;
  };

  return (
     <form className="overflow-hidden bg-gray w-96 flex-col items-center justify-center rounded px-10 shadow-md ">
  <div className="mb-4">
    <label className="block text-sm font-semibold py-2">Show Name</label>
    <input
      type="text"
      name="showName"
      value={formData.showName}
      onChange={handleChange}
      className="w-full text-gray-700 border rounded-lg h-10 px-4"
    />
    <span className="text-red-700 text-sm">{errors.showName}</span>
  </div>
  <div className="mb-4">
    <label className="block text-sm font-semibold py-2">Show Type</label>
    <input
      type="text"
      name="showType"
      value={formData.showType}
      onChange={handleChange}
      className="w-full text-gray-700 border rounded-lg h-10 px-4"
    />
    <span className="text-red-700 text-sm">{errors.showType}</span>
  </div>
  <div className="mb-4">
    <label className="block text-sm font-semibold py-2">Show Date and Time</label>
    <input
      type="datetime-local"
      name="showDateAndTime"
      value={formData.showDateAndTime}
      onChange={handleChange}
      min={getMinDateTime()}
      className="w-full text-gray-700 border rounded-lg h-10 px-4"
    />
    <span className="text-red-700 text-sm">{errors.showDateAndTime}</span>
  </div>
  <div className="mb-4">
    <label className="block text-sm font-semibold py-2">Number of Tickets</label>
    <input
  type="text"
  name="noOfTickets"
  value={formData.noOfTickets}
  onChange={handleChange}
  className="w-full text-gray-700 border rounded-lg h-10 px-4"
  inputMode="numeric"
/>

    <span className="text-red-700 text-sm">{errors.noOfTickets}</span>
  </div>
  <div className="mb-4 flex justify-center">
    <button
      type="submit"
      onClick={handleSubmit}
      className="bg-blue-500 px-9 py-2 text-sm text-white rounded-xl hover:shadow-lg hover:bg-blue-700"
    >
      Save & Next
    </button>
  </div>
</form>

    
  );
};

export default ShowDetails;

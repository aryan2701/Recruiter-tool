import React, { useState } from 'react';
import api from '../services/api';
import './AddCandidateForm.css'; 

const AddCandidateForm = () => {
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    status: '', 
    expected_salary: 0,
    nodejs_experience: '',
    reactjs_experience: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/candidates', candidateData);
      alert('Candidate added successfully!');
      // Reset form fields after successful submission
      setCandidateData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        status: '', // Reset status to empty string
        expected_salary: 0,
        nodejs_experience: '', // Reset Node.js experience to empty string
        reactjs_experience: '', // Reset ReactJS experience to empty string
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="heading">Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for candidate details */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={candidateData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={candidateData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={candidateData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={candidateData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={candidateData.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="Contacted">Contacted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Extended">Offer Extended</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expected_salary">Expected Salary:</label>
          <input
            type="number"
            id="expected_salary"
            name="expected_salary"
            value={candidateData.expected_salary}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nodejs_experience">Node.js Experience:</label>
          <select
            id="nodejs_experience"
            name="nodejs_experience"
            value={candidateData.nodejs_experience}
            onChange={handleChange}
          >
            <option value="">Select Node.js Experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="Over 2 years">Over 2 years</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reactjs_experience">ReactJS Experience:</label>
          <select
            id="reactjs_experience"
            name="reactjs_experience"
            value={candidateData.reactjs_experience}
            onChange={handleChange}
          >
            <option value="">Select ReactJS Experience</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="Over 2 years">Over 2 years</option>
          </select>
        </div>
        {/* Add more input fields for other candidate details */}
        {/* Add remaining form fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCandidateForm;

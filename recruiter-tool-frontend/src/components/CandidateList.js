import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/candidates/${id}`, { status: newStatus });
      alert('Candidate status updated successfully!');
      // Update the candidate list with the new status
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === id ? { ...candidate, status: newStatus } : candidate
        )
      );
    } catch (error) {
      console.error('Error updating candidate status:', error);
      alert('Failed to update candidate status. Please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4" id= "heading">Candidates List</h2>
      <table className="table-auto w-full" id= "candi">
        <thead>
          <tr>
            <th className="bg-gray-100 p-4">Name</th>
            <th className="bg-gray-100 p-4">Email</th>
            <th className="bg-gray-100 p-4">Phone</th>
            <th className="bg-gray-100 p-4">Skills</th>
            <th className="bg-gray-100 p-4">Status</th>
            <th className="bg-gray-100 p-4">Expected Salary</th>
            <th className="bg-gray-100 p-4">Total Score</th>
            <th className="bg-gray-100 p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-b">
              <td className="p-4">{candidate.name}</td>
              <td className="p-4">{candidate.email}</td>
              <td className="p-4">{candidate.phone}</td>
              <td className="p-4">{candidate.skills}</td>
              <td className="p-4">{candidate.status}</td>
              <td className="p-4">{candidate.expected_salary}</td>
              <td className="p-4">{candidate.total_score}</td>
              <td className="p-4">
                <select
                  className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full"
                  onChange={(e) => handleUpdateStatus(candidate.id, e.target.value)}
                >
                  <option value="">Select Action</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;

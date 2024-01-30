// App.js

import React from 'react';
import AddCandidateForm from './components/AddCandidateForm';
import CandidateList from './components/CandidateList';
import './App.css'; // Import your updated CSS file
import './tailwind.css'; // Import Tailwind CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-heading">Recruiter Tool</h1>
      </header>
      <main className="App-content">
        <div> 
          <AddCandidateForm />
        </div>
        <CandidateList />
      </main>
    </div>
  );
}

export default App;

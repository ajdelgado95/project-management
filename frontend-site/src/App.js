import React from 'react';
import './App.css';
import ProjectCRUD from './components/ProjectCRUD';

const App = () => {
  return (
    <div className="App">
      <main className="centered">
        <ProjectCRUD />
      </main>
    </div>
  );
};

export default App;

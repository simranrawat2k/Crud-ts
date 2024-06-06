import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import About from './feature/About';

function App() {
  const companyName = "MyCompany";
  const yearFounded = 2020;

  return (
    <div className="App">
      <About companyName={companyName} yearFounded={yearFounded} />
      <Home/>
    </div>
  );
}

export default App;

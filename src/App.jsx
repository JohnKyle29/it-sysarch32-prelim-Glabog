import React from 'react';
import { useState } from 'react'; // Add missing import
import './App.css';
import Header from './Header.jsx';
import Pokedex from './Pokedex.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Pokedex/>
    </div>
  );
}

export default App;
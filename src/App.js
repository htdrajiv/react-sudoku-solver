import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Su-Do-Ku
        <div>
          <Board/>
        </div>
      </header>

    </div>
  );
}

export default App;

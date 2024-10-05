import React from 'react';
import logo from './logo.svg';
import './App.css';
import WebSocketNotification from "./components/WebSocketNotification";

function App() {
  return (
    <div className="App">
      <WebSocketNotification/>
    </div>
  );
}

export default App;

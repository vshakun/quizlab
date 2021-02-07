import React from 'react';
import {Auth} from './features/auth/Auth';
import {Feed} from './features/feed/Feed';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <hr />
        <Feed />
      </header>
    </div>
  );
}

export default App;

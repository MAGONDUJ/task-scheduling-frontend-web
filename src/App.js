import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage}/>
    </div>
  );
}

export default App;

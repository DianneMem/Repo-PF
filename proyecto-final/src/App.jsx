import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/home";
import Detail from "./Components/detail/detail";

import './App.css';

export default function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/detail/:id" element={<Detail/>} />
      </Routes>
    </Router>
  </div>
  )
};

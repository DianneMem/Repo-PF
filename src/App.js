import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from './components/createProduct/CreateProduct';


import './App.css';

export default function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/createproduct" element={<CreateProduct/>}/>
        <Route exact path="/detail/:id" element={<Detail/>} />
      </Routes>
    </Router>
  </div>
  )
};


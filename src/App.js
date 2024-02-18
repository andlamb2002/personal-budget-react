import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';

import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Hero/>

      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;

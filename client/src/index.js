import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Lunch from './components/Lunch';
import Breakfast from './components/Breakfast';
import Dinner from './components/Dinner';
import Dessert from './components/Dessert';
import './style/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import BackEndTesting from './BackEndTesting';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Header />
    <Router>
      <Routes>
      <Route path="/" element={<Body />} /> 
        <Route path="/home" element={<Body />} /> 
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/dessert" element={<Dessert />} />
      </Routes>
    </Router>
    <Footer/>
    {/*<BackEndTesting/>*/}
    </>
  </React.StrictMode>
);

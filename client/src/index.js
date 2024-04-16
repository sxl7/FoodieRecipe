import React from 'react';
import ReactDOM from 'react-dom/client';
/* import App from './App'; */
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import './style/index.css';
import BackEndTesting from './BackEndTesting';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Header />
    <Body />
    <Footer/>
    <BackEndTesting/>
    </>
  </React.StrictMode>
);

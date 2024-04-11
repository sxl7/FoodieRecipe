import React from 'react';
import ReactDOM from 'react-dom/client';
/* import App from './App'; */
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Header />
    <NavBar/>
    <Footer/>
    {/* <App></App> */}
    </>
  </React.StrictMode>
);

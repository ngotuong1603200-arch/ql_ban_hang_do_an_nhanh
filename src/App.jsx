import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'
function App() {
  const location = useLocation();
  return (
    <>    
    <Header>

    </Header>
    <Footer>
      
    </Footer>
    </>
  );
}

export default App;
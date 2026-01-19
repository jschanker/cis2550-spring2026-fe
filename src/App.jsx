// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useSearchParams } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';
// import { Link } from 'react-router-dom';
// import './App.css';
import SqlInjection from './pages/SqlInjection';
import './styles.css';

function App() {
  return (
    <>
      <BrowserRouter>
        {/*<Navigation />*/}
        <Routes>
          <Route path="/" element={<SqlInjection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
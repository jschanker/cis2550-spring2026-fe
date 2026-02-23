// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
//import { HashLink } from 'react-router-hash-link';
// import { Link } from 'react-router-dom';
// import './App.css';
import SqlInjection from "./pages/SqlInjection";
import DirectoryTraversal from "./pages/DirectoryTraversal";
import CommandInjection from "./pages/CommandInjection";
import "./styles.css";

function App() {
  return (
    <>
      <BrowserRouter>
        {/*<Navigation />*/}
        <Routes>
          <Route path="/" element={<SqlInjection />} />
          <Route path="/dir-traversal" element={<DirectoryTraversal />} />
          <Route path="/command-injection" element={<CommandInjection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

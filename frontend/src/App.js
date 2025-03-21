import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hello from './pages/Hello';
import CustomerCRUD from './pages/CustomerCRUD';
import CustomerList from './pages/CustomerList';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/crud" element={<CustomerCRUD />} />
        <Route path="/list" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;

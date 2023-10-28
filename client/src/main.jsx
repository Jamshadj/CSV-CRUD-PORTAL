import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataListPage from './pages/DataListsPage'; 
import DataFormPage from './pages/DataFormPage';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Router>
    <ToastContainer /> 
    <Routes>
      <Route path="/" element={<DataListPage />} />
      <Route path="/add" element={<DataFormPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// DataFormPage.js
import React from 'react';
import DataForm from '../components/DataForm';
import Header from '../components/Header';

const DataFormPage = () => {
  return (
    <div>
      <Header link="/" title="View Data"/>
      <DataForm/>
    </div>
  );
};

export default DataFormPage;

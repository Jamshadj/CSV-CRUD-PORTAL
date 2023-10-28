// DataListPage.js
import React from 'react';
import DataList from '../components/DataList';

import Header from '../components/Header';

const DataListPage = () => {
 

  return(
    <>
    <Header link="/add" title="Add Data"/>
    <DataList/>;
    </>
  ) 
};

export default DataListPage;

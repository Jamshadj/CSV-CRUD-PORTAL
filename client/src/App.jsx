import React, { useState, useEffect } from 'react';
import DataList from './components/DataList';
import AddDataForm from './components/AddDataForm';
import { fetchData } from './api/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Web Portal</h1>
      <DataList data={data} />
      <AddDataForm />
    </div>
  );
}

export default App;

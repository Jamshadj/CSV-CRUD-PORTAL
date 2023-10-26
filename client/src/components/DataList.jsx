import React from 'react';

function DataList({ data }) {
  return (
    <div className="data-list">
      <h2>Data List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>Column 1:</strong> {item.column1}<br />
            <strong>Column 2:</strong> {item.column2}<br />
            <strong>Column 3:</strong> {item.column3}<br />
            <strong>Column 4:</strong> {item.column4}<br />
            <strong>Column 5:</strong> {item.column5}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;

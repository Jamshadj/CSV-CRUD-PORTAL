import React from 'react';

function DataList({ data }) {
  return (
    <div className="data-list">
      <h2>Data List</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>ID:</strong> {item.id}<br />
            <strong>Name:</strong> {item.name}<br />
            <strong>Age:</strong> {item.age}<br />
            <strong>Email:</strong> {item.email}<br />
            <strong>Address:</strong> {item.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;

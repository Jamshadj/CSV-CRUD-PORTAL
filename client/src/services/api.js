// api.js
const BASE_URL = 'http://localhost:3000/api'; // Update with your backend API URL

export const fetchData = async () => {
  const response = await fetch(`${BASE_URL}/data`);
  return response.json();
};

export const addData = async (data) => {
  console.log("data",data);
  const response = await fetch(`${BASE_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateData = async (id, data) => {
  console.log(data);
  const response = await fetch(`${BASE_URL}/data/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteData = async (id) => {
  const response = await fetch(`${BASE_URL}/data/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

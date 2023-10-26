const API_BASE_URL = 'http://localhost:3000/api'; 

export async function fetchData() {
  const response = await fetch(`${API_BASE_URL}/data`);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function postData(formData) {
  const response = await fetch(`${API_BASE_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
}

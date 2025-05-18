import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Main() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const URL_API = import.meta.env.VITE_URL_API;
    const token = localStorage.getItem('skillswapToken');
    axios.get(`${URL_API}/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
      .then(response => {
        const userData = response.data;
        setCourses(userData);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []); // Ensure the dependency array is empty to prevent repeated calls
  return (
    <main>
      <h2>User Data</h2>
      <ul>
        {courses.map((user, index) => (
          <li key={index}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellidos:</strong> {user.apellidos}</p>
            <p><strong>Créditos:</strong> {user.creditos}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Enabled:</strong> {user.enabled ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
// src/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = async (username: string, password: string) => {
  const response = await API.post('/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getNotes = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/notes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addNote = async (text: string) => {
  const token = localStorage.getItem('token');
  const response = await API.post('/notes', { text }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

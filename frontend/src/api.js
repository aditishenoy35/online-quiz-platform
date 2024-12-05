import axios from 'axios';

// Base URL of your backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add a token to headers for protected routes (optional, for later use)
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// API Endpoints
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const fetchDefaultQuizzes = () => API.get('/quizzes/default-quizzes');
export const fetchCategories = () => API.get('/quizzes/categories');
export const fetchAllQuizzes = () => API.get('/quizzes/all-quizzes');
export const quizCreation = (userData) => API.post('/quizzes/create',userData);
export const getUserQuizHistory = (userId) => API.get(`/quizzes/history/${userId}`);
export const fetchQuizById = (quizId) => API.get(`/quizzes/${quizId}`);
export const submitQuizResponses = (payload) => API.post('/quizzes/store-responses', payload);


export const getQuizResults = (responseId) => API.get(`/quizzes/getresults/${responseId}`);
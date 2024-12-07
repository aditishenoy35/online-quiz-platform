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
export const getUser = (userId) => API.get(`/auth/${userId}`);

export const fetchDefaultQuizzes = () => API.get('/quizzes/default-quizzes');
export const fetchCategories = () => API.get('/quizzes/categories');
export const fetchAllQuizzes = (filters) => API.get('/quizzes/all-quizzes', { params: filters });
export const quizCreation = (userData) => API.post('/quizzes/create',userData);
export const getUserQuizHistory = (userId) => API.get(`/quizzes/history/${userId}`);
export const fetchQuizById = (quizId) => API.get(`/quizzes/${quizId}`);
export const submitQuizResponses = (payload) => API.post('/quizzes/store-responses', payload);
// Delete a quiz created by a user
export const deleteUserQuiz = (userId, quizId) => API.delete(`/quizzes/user/${userId}/quiz/${quizId}`);
export const getLeaderboard = () => API.post('/quizzes/leaderboard');
export const getQuizResults = (responseId) => API.get(`/quizzes/getresults/${responseId}`);
export const checkQuizAttempt =(payload) => API.post("/quizzes/attempt",payload);


export const getQuizWithResponses =(responseId) => API.get(`/quizzes/responsequiz/${responseId}`);
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Auto-add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product APIs
export const getProducts = (keyword = '', page = 1, category = '') =>
  API.get(`/products?keyword=${keyword}&page=${page}&category=${category}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createReview = (id, rating, comment) => API.post(`/products/${id}/reviews`, { rating, comment });

// User APIs
export const registerUser = (name, email, password) => API.post('/users/register', { name, email, password });
export const loginUser = (email, password) => API.post('/users/login', { email, password });
export const getUserProfile = () => API.get('/users/profile');
export const updateUserProfile = (data) => API.put('/users/profile', data);

// Order APIs
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/myorders');
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { orderStatus: status });
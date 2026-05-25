import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = (keyword = '', page = 1) =>
  API.get(`/products?keyword=${keyword}&page=${page}`);

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const createProduct = (productData) =>
  API.post('/products', productData);

export const loginUser = (email, password) =>
  API.post('/users/login', { email, password });

export const registerUser = (name, email, password) =>
  API.post('/users/register', { name, email, password });

export const getUserProfile = () =>
  API.get('/users/profile');

export const createOrder = (orderData) =>
  API.post('/orders', orderData);

export const getMyOrders = () =>
  API.get('/orders/myorders');

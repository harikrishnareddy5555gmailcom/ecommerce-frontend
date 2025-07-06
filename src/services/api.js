import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/orders';

export const getOrders = (page = 0, size = 5, status = '') => {
  return axios.get(`${BASE_URL}?page=${page}&size=${size}&status=${status}`);
};

export const filterOrders = (filterData, page = 0, size = 5) => {
  return axios.post(`${BASE_URL}/filter?page=${page}&size=${size}`, filterData);
};

export const createOrder = (order) => {
  return axios.post(BASE_URL, order);
};

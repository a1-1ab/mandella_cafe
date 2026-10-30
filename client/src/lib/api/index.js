import createHttpClient from '../http.js';
import createResourceClient, { extendResource } from './factory.js';

const TOKEN_KEY = 'mandella.token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const http = createHttpClient({
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  getToken: tokenStorage.get,
  onUnauthorized: () => tokenStorage.clear(),
});

const authResource = createResourceClient(http, '/auth');

export const authApi = extendResource(authResource, {
  login: (payload) => http.post('/auth/login', payload).then((response) => response.data),
  register: (payload) => http.post('/auth/register', payload).then((response) => response.data),
  guest: () => http.post('/auth/guest').then((response) => response.data),
  me: () => http.get('/auth/me').then((response) => response.data),
});

const productResource = createResourceClient(http, '/products');

export const productApi = extendResource(productResource, {
  categories: () => http.get('/products/categories').then((response) => response.data),
});

const orderResource = createResourceClient(http, '/orders');

export const orderApi = extendResource(orderResource, {
  setStatus: (id, status) => http.patch(`/orders/${id}/status`, { status }).then((response) => response.data),
});

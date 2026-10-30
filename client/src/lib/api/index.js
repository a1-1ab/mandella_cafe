import createHttpClient from '../http.js';
import createResourceClient, { extendResource } from './factory.js';
import { mockAuthApi, mockOrderApi, mockProductApi } from './mock/index.js';

const TOKEN_KEY = 'mandella.token';

/** Demo builds (GitHub Pages) run against an in-browser data layer. */
export const isMockMode = import.meta.env.VITE_MOCK === 'true';

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
const productResource = createResourceClient(http, '/products');
const orderResource = createResourceClient(http, '/orders');

const liveAuthApi = extendResource(authResource, {
  login: (payload) => http.post('/auth/login', payload).then((response) => response.data),
  register: (payload) => http.post('/auth/register', payload).then((response) => response.data),
  guest: () => http.post('/auth/guest').then((response) => response.data),
  me: () => http.get('/auth/me').then((response) => response.data),
});

const liveProductApi = extendResource(productResource, {
  categories: () => http.get('/products/categories').then((response) => response.data),
});

const liveOrderApi = extendResource(orderResource, {
  setStatus: (id, status) =>
    http.patch(`/orders/${id}/status`, { status }).then((response) => response.data),
});

export const authApi = isMockMode ? mockAuthApi : liveAuthApi;
export const productApi = isMockMode ? mockProductApi : liveProductApi;
export const orderApi = isMockMode ? mockOrderApi : liveOrderApi;

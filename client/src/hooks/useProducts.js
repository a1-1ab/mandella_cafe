import useResource from './useResource.js';
import { productApi } from '../lib/api/index.js';

export const useProducts = ({ category = 'all', q = '', featured } = {}) =>
  useResource(() => productApi.list({ category, q, featured }), {
    deps: [category, q, featured],
  });

export const useCategories = () => useResource(() => productApi.categories(), { deps: [] });

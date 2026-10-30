import useResource from './useResource.js';
import { productApi } from '../lib/api/index.js';

const useProduct = (id) => useResource(() => productApi.get(id), { deps: [id], immediate: Boolean(id) });

export default useProduct;

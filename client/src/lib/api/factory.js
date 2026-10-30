import { unwrap } from '../http.js';

/**
 * Builds a REST resource client from a path.
 * Every resource gets the same predictable surface.
 */
const createResourceClient = (http, path) => {
  const url = (id) => (id ? `${path}/${id}` : path);

  return {
    list: (query) => http.get(url(), { query }).then(unwrap),
    get: (id) => http.get(url(id)).then(unwrap),
    create: (payload) => http.post(url(), payload).then(unwrap),
    update: (id, payload) => http.patch(url(id), payload).then(unwrap),
    replace: (id, payload) => http.put(url(id), payload).then(unwrap),
    remove: (id) => http.remove(url(id)).then(unwrap),
  };
};

export const extendResource = (resource, extensions) => ({ ...resource, ...extensions });

export default createResourceClient;

export class HttpError extends Error {
  constructor(message, { status = 0, details = null, cause = null } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
    this.cause = cause;
  }
}

const buildUrl = (baseUrl, path, query) => {
  const url = new URL(`${baseUrl.replace(/\/$/, '')}${path}`, window.location.origin);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const readBody = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

/**
 * Minimal fetch-based client with one central place for auth + error handling.
 */
const createHttpClient = ({ baseUrl, getToken, onUnauthorized } = {}) => {
  const request = async (path, { method = 'GET', body, query, signal, headers = {} } = {}) => {
    const token = getToken?.();

    const config = {
      method,
      signal,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    let response;
    try {
      response = await fetch(buildUrl(baseUrl, path, query), config);
    } catch (error) {
      throw new HttpError('تعذر الاتصال بالخادم، تحقق من الشبكة', { cause: error });
    }

    const payload = await readBody(response);

    if (!response.ok) {
      if (response.status === 401) onUnauthorized?.();

      throw new HttpError(payload?.message || 'حدث خطأ غير متوقع', {
        status: response.status,
        details: payload?.details ?? null,
      });
    }

    return payload;
  };

  return {
    request,
    get: (path, options) => request(path, { ...options, method: 'GET' }),
    post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
    patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
    put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
    remove: (path, options) => request(path, { ...options, method: 'DELETE' }),
  };
};

export const unwrap = (response) => response?.data ?? null;

export default createHttpClient;

import { getToken, clearAuth } from './auth.js';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`/api${path}`, { ...options, headers });

  if (res.status === 401) {
    clearAuth();
    window.location.href = '/login';
    throw new ApiError('Session expired', 401);
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof json.error === 'string' ? json.error : json.error?.message || 'Request failed';
    throw new ApiError(message, res.status);
  }

  return json.data;
}

export const api = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getMe: () => request('/auth/me'),

  getDashboard: () => request('/admin/dashboard'),

  getActivity: () => request('/admin/activity'),

  uploadImage: (file) => {
    const form = new FormData();
    form.append('image', file);
    return request('/admin/upload', { method: 'POST', body: form });
  },

  services: {
    list: () => request('/admin/services'),
    get: (id) => request(`/admin/services/${id}`),
    create: (data) => request('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) =>
      request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/admin/services/${id}`, { method: 'DELETE' }),
  },

  projects: {
    list: () => request('/admin/projects'),
    get: (id) => request(`/admin/projects/${id}`),
    create: (data) => request('/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) =>
      request(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/admin/projects/${id}`, { method: 'DELETE' }),
  },

  blog: {
    list: () => request('/admin/blog'),
    get: (id) => request(`/admin/blog/${id}`),
    create: (data) => request('/admin/blog', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) =>
      request(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/admin/blog/${id}`, { method: 'DELETE' }),
  },

  testimonials: {
    list: () => request('/admin/testimonials'),
    get: (id) => request(`/admin/testimonials/${id}`),
    create: (data) =>
      request('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) =>
      request(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/admin/testimonials/${id}`, { method: 'DELETE' }),
  },

  inquiries: {
    list: (status) => request(`/admin/inquiries${status ? `?status=${status}` : ''}`),
    get: (id) => request(`/admin/inquiries/${id}`),
    updateStatus: (id, status) =>
      request(`/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  },

  faq: {
    list: () => request('/admin/faq'),
    get: (id) => request(`/admin/faq/${id}`),
    create: (data) => request('/admin/faq', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) =>
      request(`/admin/faq/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/admin/faq/${id}`, { method: 'DELETE' }),
  },
};

export { ApiError };

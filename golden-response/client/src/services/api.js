import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function getProjects(category) {
  return api.get('/projects', {
    params: category && category !== 'All' ? { category: category.toLowerCase() } : {}
  });
}

export function submitLead(payload) {
  return api.post('/leads', payload);
}

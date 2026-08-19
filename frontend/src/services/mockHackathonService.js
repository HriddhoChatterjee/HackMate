import api from '../utils/api';

export async function getMockHackathons(params = {}) {
  const { data } = await api.get('/mock-hackathons/', { params });
  return data;
}

export async function getMockHackathon(id) {
  const { data } = await api.get(`/mock-hackathons/${id}`);
  return data;
}

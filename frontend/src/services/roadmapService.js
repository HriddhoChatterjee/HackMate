import api from '../utils/api';

const normalizeError = async (error) => {
  const detail = error?.response?.data?.detail;
  if (typeof detail === 'string') return new Error(detail);
  if (Array.isArray(detail)) return new Error(detail.map((item) => item.msg).join(', '));
  return new Error(error?.message || 'Roadmap request failed');
};

export const getRoadmapDomains = async () => {
  try {
    const { data } = await api.get('/roadmaps/domains');
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

export const getRoadmaps = async ({ domain } = {}) => {
  try {
    const { data } = await api.get('/roadmaps/', {
      params: domain ? { domain } : undefined,
    });
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

export const getRoadmap = async (roadmapId) => {
  try {
    const { data } = await api.get(`/roadmaps/${roadmapId}`);
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

export const getRoadmapBySlug = async (slug) => {
  try {
    const { data } = await api.get(`/roadmaps/slug/${encodeURIComponent(slug)}`);
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

export const getRoadmapProgress = async (roadmapId) => {
  try {
    const { data } = await api.get(`/roadmaps/${roadmapId}/progress`);
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

export const updateRoadmapProgress = async (roadmapId, stepId, completed) => {
  try {
    const { data } = await api.put(`/roadmaps/${roadmapId}/progress`, {
      step_id: stepId,
      completed,
    });
    return data;
  } catch (error) {
    throw await normalizeError(error);
  }
};

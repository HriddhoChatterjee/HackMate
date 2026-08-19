import api from '../utils/api';

export async function getWorkspace(teamId) {
  const { data } = await api.get(`/workspace/${teamId}`);
  return data;
}

export async function createWorkspace(payload) {
  const { data } = await api.post('/workspace', payload);
  return data;
}

export async function getTasks(teamId) {
  const { data } = await api.get(`/teams/${teamId}/tasks`);
  return data;
}

export async function createTask(payload) {
  const { data } = await api.post('/tasks', payload);
  return data;
}

export async function updateTask(taskId, payload) {
  const { data } = await api.patch(`/tasks/${taskId}`, payload);
  return data;
}

export async function updateTaskStatus(taskId, status) {
  const { data } = await api.patch(`/tasks/${taskId}/status`, { status });
  return data;
}

export async function deleteTask(taskId) {
  const { data } = await api.delete(`/tasks/${taskId}`);
  return data;
}

export async function getMessages(teamId) {
  const { data } = await api.get(`/teams/${teamId}/messages`);
  return data;
}

export async function sendMessage(payload) {
  const { data } = await api.post('/messages', payload);
  return data;
}

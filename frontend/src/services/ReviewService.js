import api from '../utils/api';

export async function getAllReviews(userId) {
  const endpoint = userId ? `/reviews/user/${userId}` : '/reviews/';
  const { data } = await api.get(endpoint);
  return data;
}

export async function createReview(reviewData) {
  const { data } = await api.post('/reviews/', reviewData);
  return data;
}

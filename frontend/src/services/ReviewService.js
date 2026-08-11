const API_URL = "http://localhost:8000/reviews";

export const getAllReviews = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

export const getReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }

  return response.json();
};

export const createReview = async (reviewData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) {
    throw new Error("Failed to create review");
  }

  return response.json();
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reviewData)
  });

  if (!response.ok) {
    throw new Error("Failed to update review");
  }

  return response.json();
};

export const deleteReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete review");
  }

  return response.json();
};
const API_URL = "http://localhost:8000/opportunities";

export const getAllOpportunities = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  return response.json();
};

export const getOpportunity = async (opportunityId) => {
  const response = await fetch(`${API_URL}/${opportunityId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch opportunity");
  }

  return response.json();
};

export const createOpportunity = async (opportunityData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(opportunityData)
  });

  if (!response.ok) {
    throw new Error("Failed to create opportunity");
  }

  return response.json();
};

export const updateOpportunity = async (
  opportunityId,
  opportunityData
) => {
  const response = await fetch(`${API_URL}/${opportunityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(opportunityData)
  });

  if (!response.ok) {
    throw new Error("Failed to update opportunity");
  }

  return response.json();
};

export const deleteOpportunity = async (opportunityId) => {
  const response = await fetch(`${API_URL}/${opportunityId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete opportunity");
  }

  return response.json();
};
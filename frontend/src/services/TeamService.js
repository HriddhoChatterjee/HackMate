const API_URL = "http://localhost:8000/teams";

export const getAllTeams = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

export const getTeam = async (teamId) => {
  const response = await fetch(`${API_URL}/${teamId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }

  return response.json();
};

export const createTeam = async (teamData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(teamData)
  });

  if (!response.ok) {
    throw new Error("Failed to create team");
  }

  return response.json();
};

export const updateTeam = async (teamId, teamData) => {
  const response = await fetch(`${API_URL}/${teamId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(teamData)
  });

  if (!response.ok) {
    throw new Error("Failed to update team");
  }

  return response.json();
};

export const deleteTeam = async (teamId) => {
  const response = await fetch(`${API_URL}/${teamId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete team");
  }

  return response.json();
};
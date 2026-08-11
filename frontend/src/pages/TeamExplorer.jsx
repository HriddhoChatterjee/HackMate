import { useState } from "react";

function TeamExplorer() {
  const [search, setSearch] = useState("");

  const teams = [
    {
      id: 1,
      name: "Team Alpha",
      opportunity: "Smart India Hackathon",
      leader: "Team Leader",
      members: 2,
      maxMembers: 4,
      status: "Looking for Members"
    },
    {
      id: 2,
      name: "Team Beta",
      opportunity: "Hack the Future",
      leader: "Team Leader",
      members: 3,
      maxMembers: 5,
      status: "Looking for Members"
    },
    {
      id: 3,
      name: "Team Gamma",
      opportunity: "Data Science Challenge",
      leader: "Team Leader",
      members: 3,
      maxMembers: 3,
      status: "Full"
    }
  ];

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      team.opportunity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Team Explorer</h1>
        <p>Find teams to join for upcoming opportunities.</p>
      </div>

      <input
        type="text"
        placeholder="Search teams..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      <div style={styles.grid}>
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div key={team.id} style={styles.card}>
              <h2>{team.name}</h2>

              <p>
                <strong>Opportunity:</strong> {team.opportunity}
              </p>

              <p>
                <strong>Leader:</strong> {team.leader}
              </p>

              <p>
                <strong>Members:</strong> {team.members}/{team.maxMembers}
              </p>

              <p>
                <strong>Status:</strong> {team.status}
              </p>

              <button style={styles.button}>
                View Team
              </button>
            </div>
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px"
  },
  header: {
    marginBottom: "25px"
  },
  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
    marginBottom: "25px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff"
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default TeamExplorer;
import { useState } from "react";

function OpportunityBoard() {
  const [search, setSearch] = useState("");

  const opportunities = [
    {
      id: 1,
      name: "Smart India Hackathon",
      domain: "Artificial Intelligence",
      deadline: "2026-08-20",
      teamSize: 4,
      description: "Build an innovative solution for a real-world problem."
    },
    {
      id: 2,
      name: "Hack the Future",
      domain: "Web Development",
      deadline: "2026-08-25",
      teamSize: 5,
      description: "Develop a technology-driven solution for the future."
    },
    {
      id: 3,
      name: "Data Science Challenge",
      domain: "Data Science",
      deadline: "2026-09-01",
      teamSize: 3,
      description: "Use data and analytics to solve meaningful problems."
    }
  ];

  const filteredOpportunities = opportunities.filter((opportunity) =>
    opportunity.name.toLowerCase().includes(search.toLowerCase()) ||
    opportunity.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Opportunity Board</h1>
        <p>Find hackathons and opportunities to participate in.</p>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.grid}>
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} style={styles.card}>
              <h2>{opportunity.name}</h2>

              <p>
                <strong>Domain:</strong> {opportunity.domain}
              </p>

              <p>
                <strong>Deadline:</strong> {opportunity.deadline}
              </p>

              <p>
                <strong>Team Size:</strong> {opportunity.teamSize}
              </p>

              <p>{opportunity.description}</p>

              <button style={styles.button}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No opportunities found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    marginBottom: "25px"
  },
  searchContainer: {
    marginBottom: "25px"
  },
  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px",
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
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default OpportunityBoard;
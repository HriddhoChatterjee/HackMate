
import { useState } from "react";

function TeamDetails() {
  const [showApplication, setShowApplication] = useState(false);

  const team = {
    id: 1,
    name: "Team Alpha",
    opportunity: "Smart India Hackathon",
    leader: "Team Leader",
    maxMembers: 4,
    status: "Looking for Members",
    description:
      "A team working together to build an innovative solution for the selected hackathon.",
    members: [
      {
        id: 1,
        name: "Team Leader",
        role: "Team Leader"
      },
      {
        id: 2,
        name: "Member 1",
        role: "Frontend Developer"
      }
    ],
    requirements: [
      "Backend Developer",
      "UI Developer",
      "Data Analyst"
    ]
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>{team.name}</h1>
        <span style={styles.status}>{team.status}</span>
      </div>

      <div style={styles.card}>
        <h2>Team Information</h2>

        <div style={styles.detail}>
          <strong>Opportunity:</strong>
          <span>{team.opportunity}</span>
        </div>

        <div style={styles.detail}>
          <strong>Team Leader:</strong>
          <span>{team.leader}</span>
        </div>

        <div style={styles.detail}>
          <strong>Maximum Members:</strong>
          <span>{team.maxMembers}</span>
        </div>
      </div>

      <div style={styles.card}>
        <h2>About the Team</h2>
        <p>{team.description}</p>
      </div>

      <div style={styles.card}>
        <h2>Team Members</h2>

        {team.members.map((member) => (
          <div key={member.id} style={styles.member}>
            <strong>{member.name}</strong>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h2>Looking For</h2>

        <div style={styles.requirements}>
          {team.requirements.map((requirement, index) => (
            <span key={index} style={styles.requirement}>
              {requirement}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowApplication(!showApplication)}
        style={styles.button}
      >
        Apply to Join Team
      </button>

      {showApplication && (
        <div style={styles.applicationBox}>
          <h2>Team Application</h2>
          <p>
            Submit your application to join this team.
          </p>

          <button
            onClick={() => alert("Application submitted!")}
            style={styles.submitButton}
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px"
  },
  header: {
    marginBottom: "25px"
  },
  status: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "#eee"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#fff"
  },
  detail: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee"
  },
  member: {
    padding: "12px 0",
    borderBottom: "1px solid #eee"
  },
  requirements: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  requirement: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },
  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px"
  },
  applicationBox: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px"
  },
  submitButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default TeamDetails;
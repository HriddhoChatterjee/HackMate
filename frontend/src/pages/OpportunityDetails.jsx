
import { useState } from "react";

function OpportunityDetails() {
  const [showApplication, setShowApplication] = useState(false);

  const opportunity = {
    id: 1,
    name: "Smart India Hackathon",
    domain: "Artificial Intelligence",
    deadline: "2026-08-20",
    teamSize: 4,
    registrationLink: "https://www.sih.gov.in/",
    description:
      "Smart India Hackathon is an opportunity for students to develop innovative solutions to real-world problems using technology.",
    createdBy: "HackMate User",
    createdAt: "2026-08-01"
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>{opportunity.name}</h1>
        <span style={styles.domain}>{opportunity.domain}</span>
      </div>

      <div style={styles.card}>
        <h2>Opportunity Details</h2>

        <div style={styles.detail}>
          <strong>Domain:</strong>
          <span>{opportunity.domain}</span>
        </div>

        <div style={styles.detail}>
          <strong>Registration Deadline:</strong>
          <span>{opportunity.deadline}</span>
        </div>

        <div style={styles.detail}>
          <strong>Maximum Team Size:</strong>
          <span>{opportunity.teamSize} members</span>
        </div>

        <div style={styles.detail}>
          <strong>Created By:</strong>
          <span>{opportunity.createdBy}</span>
        </div>

        <div style={styles.detail}>
          <strong>Created On:</strong>
          <span>{opportunity.createdAt}</span>
        </div>
      </div>

      <div style={styles.card}>
        <h2>Description</h2>
        <p>{opportunity.description}</p>
      </div>

      <div style={styles.actions}>
        <a
          href={opportunity.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.linkButton}
        >
          Registration Link
        </a>

        <button
          onClick={() => setShowApplication(!showApplication)}
          style={styles.button}
        >
          Apply to a Team
        </button>
      </div>

      {showApplication && (
        <div style={styles.applicationBox}>
          <h2>Apply to a Team</h2>
          <p>
            Team application functionality will be connected to the backend
            later.
          </p>

          <button
            onClick={() => setShowApplication(false)}
            style={styles.closeButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  header: {
    marginBottom: "25px"
  },
  domain: {
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
  actions: {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  },
  button: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  },
  linkButton: {
    padding: "11px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    border: "1px solid #ccc"
  },
  applicationBox: {
    marginTop: "25px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px"
  },
  closeButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default OpportunityDetails;
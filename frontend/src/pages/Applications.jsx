import { useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      team: "Team Alpha",
      opportunity: "Smart India Hackathon",
      status: "Pending",
      appliedDate: "2026-08-05"
    },
    {
      id: 2,
      team: "Team Beta",
      opportunity: "Hack the Future",
      status: "Accepted",
      appliedDate: "2026-08-03"
    },
    {
      id: 3,
      team: "Team Gamma",
      opportunity: "Data Science Challenge",
      status: "Rejected",
      appliedDate: "2026-08-01"
    }
  ]);

  const handleCancel = (applicationId) => {
    setApplications(
      applications.filter(
        (application) => application.id !== applicationId
      )
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Applications</h1>
        <p>View and manage your team applications.</p>
      </div>

      <div style={styles.list}>
        {applications.length > 0 ? (
          applications.map((application) => (
            <div key={application.id} style={styles.card}>
              <div>
                <h2>{application.team}</h2>

                <p>
                  <strong>Opportunity:</strong>{" "}
                  {application.opportunity}
                </p>

                <p>
                  <strong>Applied On:</strong>{" "}
                  {application.appliedDate}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span style={styles.status}>
                    {application.status}
                  </span>
                </p>
              </div>

              {application.status === "Pending" && (
                <button
                  onClick={() => handleCancel(application.id)}
                  style={styles.button}
                >
                  Cancel Application
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No applications found.</p>
        )}
      </div>
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff"
  },
  status: {
    padding: "5px 10px",
    borderRadius: "15px",
    backgroundColor: "#eee"
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Applications;
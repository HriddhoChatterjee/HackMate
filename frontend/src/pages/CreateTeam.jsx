import { useState } from "react";

function CreateTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    opportunity: "",
    maxMembers: "",
    description: "",
    requirements: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Team Data:", formData);

    alert("Team created successfully!");
  };

  return (
    <div style={styles.container}>
      <h1>Create Team</h1>
      <p style={styles.subtitle}>
        Create a team and find members for your opportunity.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Team Name</label>
        <input
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          placeholder="Enter team name"
          required
        />

        <label>Opportunity</label>
        <input
          type="text"
          name="opportunity"
          value={formData.opportunity}
          onChange={handleChange}
          placeholder="Enter opportunity name"
          required
        />

        <label>Maximum Team Members</label>
        <input
          type="number"
          name="maxMembers"
          value={formData.maxMembers}
          onChange={handleChange}
          placeholder="Enter maximum members"
          min="2"
          required
        />

        <label>Team Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your team..."
          rows="5"
          required
        />

        <label>Required Skills</label>
        <input
          type="text"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Example: React, Python, Data Science"
        />

        <button type="submit" style={styles.button}>
          Create Team
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px"
  },
  subtitle: {
    marginBottom: "25px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  button: {
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default CreateTeam;
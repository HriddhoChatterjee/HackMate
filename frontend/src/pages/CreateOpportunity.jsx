
import { useState } from "react";

function CreateOpportunity() {
  const [formData, setFormData] = useState({
    hackathonName: "",
    registrationLink: "",
    deadline: "",
    domain: "",
    description: "",
    teamSize: ""
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

    console.log("Opportunity Data:", formData);

    alert("Opportunity created successfully!");
  };

  return (
    <div style={styles.container}>
      <h1>Create Opportunity</h1>
      <p style={styles.subtitle}>
        Add a new hackathon or opportunity for students to explore.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Hackathon Name</label>
        <input
          type="text"
          name="hackathonName"
          value={formData.hackathonName}
          onChange={handleChange}
          placeholder="Enter hackathon name"
          required
        />

        <label>Registration Link</label>
        <input
          type="url"
          name="registrationLink"
          value={formData.registrationLink}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <label>Registration Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />

        <label>Domain</label>
        <select
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          required
        >
          <option value="">Select a domain</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Machine Learning">
            Machine Learning
          </option>
          <option value="Web Development">
            Web Development
          </option>
          <option value="App Development">
            App Development
          </option>
          <option value="Data Science">
            Data Science
          </option>
          <option value="Cyber Security">
            Cyber Security
          </option>
          <option value="Other">Other</option>
        </select>

        <label>Team Size</label>
        <input
          type="number"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          placeholder="Maximum team size"
          min="1"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the opportunity..."
          rows="5"
          required
        />

        <button type="submit" style={styles.button}>
          Create Opportunity
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

export default CreateOpportunity;
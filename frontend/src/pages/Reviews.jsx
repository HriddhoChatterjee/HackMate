import { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewer: "User 1",
      team: "Team Alpha",
      rating: 5,
      comment: "Great communication and teamwork.",
      date: "2026-08-05"
    },
    {
      id: 2,
      reviewer: "User 2",
      team: "Team Beta",
      rating: 4,
      comment: "Good collaboration and contribution.",
      date: "2026-08-03"
    }
  ]);

  const [formData, setFormData] = useState({
    rating: "",
    comment: ""
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

    const newReview = {
      id: reviews.length + 1,
      reviewer: "Current User",
      team: "Selected Team",
      rating: Number(formData.rating),
      comment: formData.comment,
      date: new Date().toISOString().split("T")[0]
    };

    setReviews([...reviews, newReview]);

    setFormData({
      rating: "",
      comment: ""
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Reviews</h1>
        <p>View feedback and share your experience with team members.</p>
      </div>

      <div style={styles.formCard}>
        <h2>Write a Review</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Rating</label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <label>Comment</label>

          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your feedback..."
            rows="4"
            required
          />

          <button type="submit" style={styles.button}>
            Submit Review
          </button>
        </form>
      </div>

      <div>
        <h2>Previous Reviews</h2>

        <div style={styles.list}>
          {reviews.map((review) => (
            <div key={review.id} style={styles.card}>
              <h3>{review.reviewer}</h3>

              <p>
                <strong>Team:</strong> {review.team}
              </p>

              <p>
                <strong>Rating:</strong> {review.rating}/5
              </p>

              <p>{review.comment}</p>

              <small>{review.date}</small>
            </div>
          ))}
        </div>
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
  formCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px"
  }
};

export default Reviews;
import { useEffect, useState } from 'react';
import { getAllReviews, createReview } from '../services/ReviewService';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ reviewee_id: '', team_id: '', rating: '', tags: '', comment: '' });
  const [error, setError] = useState('');

  const load = () => getAllReviews().then(setReviews).catch(() => setError('Could not load reviews.'));
  useEffect(load, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await createReview({ ...form, reviewee_id: Number(form.reviewee_id), team_id: Number(form.team_id), rating: Number(form.rating), tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) });
      setForm({ reviewee_id: '', team_id: '', rating: '', tags: '', comment: '' });
      load();
    } catch { setError('Could not submit review. Check the team/member details.'); }
  };

  return <section className="learning-page"><header className="page-heading"><div><span className="eyebrow">REPUTATION</span><h1>Reviews</h1><p>Give teammates structured feedback after working together.</p></div></header>{error && <div className="alert">{error}</div>}<div className="review-layout"><form className="panel review-form" onSubmit={submit}><h2>Write a review</h2><input type="number" min="1" placeholder="Teammate user ID" value={form.reviewee_id} onChange={(e) => setForm({ ...form, reviewee_id: e.target.value })} required/><input type="number" min="1" placeholder="Team ID" value={form.team_id} onChange={(e) => setForm({ ...form, team_id: e.target.value })} required/><select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} required><option value="">Rating</option>{[1,2,3,4,5].map((value) => <option key={value} value={value}>{value}/5</option>)}</select><input placeholder="Tags: communicative, reliable" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}/><textarea rows="5" placeholder="What went well?" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}/><button className="primary-btn">Submit Review</button></form><div className="review-list">{reviews.map((review) => <article className="panel review-card" key={review.id}><div className="review-top"><strong>User #{review.reviewer_id} → User #{review.reviewee_id}</strong><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><p>{review.comment || 'No written comment.'}</p><div className="tag-row">{(review.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}{!reviews.length && <div className="panel muted">No reviews yet.</div>}</div></div></section>;
}

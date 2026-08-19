import { useEffect, useState } from 'react';
import { getMockHackathon, getMockHackathons } from '../services/mockHackathonService';

export default function MockHackathons() {
  const [challenges, setChallenges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ domain: '', difficulty: '' });
  const [error, setError] = useState('');

  const load = () => getMockHackathons(filters).then(setChallenges).catch(() => setError('Could not load mock challenges.'));
  useEffect(load, [filters.domain, filters.difficulty]);

  const open = async (id) => {
    try { setSelected(await getMockHackathon(id)); } catch { setError('Could not load challenge details.'); }
  };

  return <section className="learning-page"><header className="page-heading"><div><span className="eyebrow">PRACTICE</span><h1>Mock Hackathons</h1><p>Practice under realistic constraints before the real event.</p></div></header>{error && <div className="alert">{error}</div>}<div className="filters"><input placeholder="Filter by domain" value={filters.domain} onChange={(e) => setFilters({ ...filters, domain: e.target.value })}/><select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}><option value="">All difficulties</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div><div className="challenge-grid">{challenges.map((challenge) => <button className="challenge-card" key={challenge.id} onClick={() => open(challenge.id)}><span className="difficulty">{challenge.difficulty}</span><h2>{challenge.title}</h2><p>{challenge.description}</p><footer><span>{challenge.domain}</span><span>{challenge.duration_minutes} min</span></footer></button>)}{!challenges.length && <div className="panel muted">No mock challenges have been seeded yet.</div>}</div>{selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><article className="modal-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><span className="eyebrow">CHALLENGE</span><h2>{selected.title}</h2><p>{selected.description}</p><p><strong>Difficulty:</strong> {selected.difficulty}</p><p><strong>Duration:</strong> {selected.duration_minutes} minutes</p>{selected.requirements && <p><strong>Requirements:</strong> {selected.requirements}</p>}<button className="primary-btn" onClick={() => setSelected(null)}>Start Practice</button></article></div>}</section>;
}

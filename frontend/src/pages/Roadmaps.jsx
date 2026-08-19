import { useEffect, useMemo, useState } from 'react';
import {
  getRoadmapDomains,
  getRoadmaps,
  getRoadmap,
  getRoadmapProgress,
  updateRoadmapProgress,
} from '../services/roadmapService';
import './Roadmaps.css';

const difficultyClass = {
  beginner: 'roadmap-badge roadmap-badge--beginner',
  intermediate: 'roadmap-badge roadmap-badge--intermediate',
  advanced: 'roadmap-badge roadmap-badge--advanced',
};

export default function Roadmaps() {
  const [domains, setDomains] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [savingStep, setSavingStep] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [domainData, roadmapData] = await Promise.all([
          getRoadmapDomains(),
          getRoadmaps(),
        ]);
        if (cancelled) return;
        setDomains(domainData);
        setRoadmaps(roadmapData);
        if (roadmapData.length) await openRoadmap(roadmapData[0].id, cancelled);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRoadmaps = useMemo(
    () => selectedDomain ? roadmaps.filter((item) => item.domain === selectedDomain) : roadmaps,
    [roadmaps, selectedDomain],
  );

  async function openRoadmap(roadmapId, cancelled = false) {
    setDetailLoading(true);
    setError('');
    try {
      const [roadmap, roadmapProgress] = await Promise.all([
        getRoadmap(roadmapId),
        getRoadmapProgress(roadmapId),
      ]);
      if (cancelled) return;
      setSelectedRoadmap(roadmap);
      setProgress(roadmapProgress);
    } catch (err) {
      if (!cancelled) setError(err.message);
    } finally {
      if (!cancelled) setDetailLoading(false);
    }
  }

  async function handleStepToggle(step) {
    if (step.locked || savingStep) return;
    setSavingStep(step.id);
    setError('');
    try {
      const updated = await updateRoadmapProgress(
        selectedRoadmap.id,
        step.id,
        !step.completed,
      );
      setProgress(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStep(null);
    }
  }

  const visibleSteps = selectedRoadmap?.steps || [];
  const progressMap = new Map((progress?.steps || []).map((step) => [step.id, step]));

  return (
    <main className="roadmaps-page">
      <header className="roadmaps-hero">
        <div>
          <span className="roadmaps-kicker">$ hackmate roadmap --guided</span>
          <h1>Pick a path. Build something real.</h1>
          <p>
            Curated, dependency-aware learning paths for the skills you need to ship hackathon projects.
            No AI guesswork — every step follows explicit prerequisites.
          </p>
        </div>
        {progress && (
          <div className="roadmaps-progress-card" aria-label="Roadmap progress">
            <span>Progress</span>
            <strong>{progress.percentage}%</strong>
            <div className="roadmaps-progress-track">
              <div style={{ width: `${progress.percentage}%` }} />
            </div>
            <small>{progress.completed_count} / {progress.total_steps} milestones</small>
          </div>
        )}
      </header>

      {error && <div className="roadmaps-error" role="alert">{error}</div>}

      <section className="roadmaps-layout">
        <aside className="roadmaps-sidebar">
          <div className="roadmaps-section-heading">
            <span>Learning paths</span>
            <strong>{roadmaps.length}</strong>
          </div>
          <select
            aria-label="Filter roadmaps by domain"
            value={selectedDomain}
            onChange={(event) => {
              const domain = event.target.value;
              setSelectedDomain(domain);
              const next = domain ? roadmaps.find((item) => item.domain === domain) : roadmaps[0];
              if (next) openRoadmap(next.id);
            }}
          >
            <option value="">All domains</option>
            {domains.map((domain) => <option key={domain} value={domain}>{domain}</option>)}
          </select>

          <div className="roadmap-list">
            {loading ? <div className="roadmap-skeleton" /> : filteredRoadmaps.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`roadmap-list-item ${selectedRoadmap?.id === item.id ? 'is-active' : ''}`}
                onClick={() => openRoadmap(item.id)}
              >
                <span>{item.domain}</span>
                <strong>{item.title}</strong>
                <small>{item.step_count} milestones · {item.estimated_weeks} weeks</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="roadmaps-content" aria-live="polite">
          {detailLoading && <div className="roadmap-loading">Loading roadmap…</div>}
          {!detailLoading && selectedRoadmap && (
            <>
              <div className="roadmap-detail-head">
                <div>
                  <div className="roadmap-domain">{selectedRoadmap.domain}</div>
                  <h2>{selectedRoadmap.title}</h2>
                  <p>{selectedRoadmap.description}</p>
                </div>
                <div className="roadmap-meta">
                  <span className={difficultyClass[selectedRoadmap.difficulty] || 'roadmap-badge'}>
                    {selectedRoadmap.difficulty}
                  </span>
                  <span>{selectedRoadmap.estimated_weeks} weeks</span>
                  <span>v{selectedRoadmap.version}</span>
                </div>
              </div>

              <div className="roadmap-rule-note">
                <strong>How the rules work</strong>
                <span>
                  A milestone becomes available only when all of its prerequisite milestones are complete.
                  This prevents users from jumping into advanced topics before the required foundations.
                </span>
              </div>

              <div className="roadmap-timeline">
                {visibleSteps.map((step, index) => {
                  const state = progressMap.get(step.id) || {
                    completed: false,
                    locked: step.prerequisites.length > 0,
                  };
                  const isSaving = savingStep === step.id;
                  return (
                    <article key={step.id} className={`roadmap-step ${state.completed ? 'is-complete' : ''} ${state.locked ? 'is-locked' : ''}`}>
                      <div className="roadmap-step-marker" aria-hidden="true">
                        {state.completed ? '✓' : index + 1}
                      </div>
                      <div className="roadmap-step-body">
                        <div className="roadmap-step-topline">
                          <div>
                            <span className="roadmap-step-label">Milestone {index + 1}</span>
                            <h3>{step.title}</h3>
                          </div>
                          <span>{step.estimated_hours}h</span>
                        </div>
                        <p>{step.description}</p>

                        {step.prerequisites.length > 0 && (
                          <div className="roadmap-prereqs">
                            <strong>Prerequisites:</strong> {step.prerequisites.join(', ')}
                          </div>
                        )}

                        {step.project && (
                          <div className="roadmap-project">
                            <strong>Build:</strong> {step.project}
                          </div>
                        )}

                        <div className="roadmap-resources">
                          {step.resources.map((resource) => (
                            <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
                              {resource.title} ↗
                            </a>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="roadmap-complete-button"
                          disabled={state.locked || isSaving}
                          onClick={() => handleStepToggle({ ...step, ...state })}
                          title={state.locked ? 'Complete the prerequisite milestones first' : ''}
                        >
                          {isSaving ? 'Saving…' : state.completed ? 'Mark as incomplete' : state.locked ? 'Locked by prerequisites' : 'Mark complete'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

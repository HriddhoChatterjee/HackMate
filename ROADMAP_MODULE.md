# HackMate Roadmaps Module

## Design

The roadmap engine is deterministic and rule-based. It does not call an LLM or any AI API.

Each roadmap is a versioned domain path. Every milestone has:

- a stable `id`
- a description
- estimated hours
- curated resources
- an optional capstone/project
- zero or more prerequisite milestone IDs

A milestone is **locked** until all of its prerequisites are completed. The backend enforces the same rule as the frontend, so users cannot bypass the learning sequence by calling the API directly.

## Included domains

1. Web Development
2. Backend Development
3. Cybersecurity
4. AI & Machine Learning
5. Data Science
6. DevOps & Cloud
7. Mobile Development
8. Blockchain Development
9. UI/UX Design
10. DSA & Competitive Programming

The catalog currently contains 77 milestones.

## API

- `GET /roadmaps/` — list roadmap summaries; optional `domain` filter
- `GET /roadmaps/domains` — list available domains
- `GET /roadmaps/{id}` — full roadmap
- `GET /roadmaps/slug/{slug}` — full roadmap by slug
- `GET /roadmaps/{id}/progress` — current user's progress and next unlocked milestone
- `PUT /roadmaps/{id}/progress` — mark a milestone complete/incomplete
- `POST /roadmaps/` — create a roadmap definition

## Data lifecycle

`app/data/roadmap_catalog.py` is the version-controlled source of truth. On application startup, missing/changed catalog rows are synchronized into PostgreSQL by `roadmap_seed_service.py`.

For an existing PostgreSQL database, `app/database/roadmap_migration.py` adds the new metadata columns safely. The equivalent SQL is also provided at `backend/migrations/001_roadmap_metadata.sql`.

## Why this is not AI

The project specification defines Roadmaps as domain selection + roadmap content + resources. It lists AI-powered compatibility scoring under future enhancements, not roadmap generation. This implementation therefore keeps roadmap sequencing deterministic and explainable.

AI can be added later as an optional personalization layer without changing the underlying curated roadmap or prerequisite rules.

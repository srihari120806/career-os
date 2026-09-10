# CareerOS 🚀

AI-powered career development platform for resume optimization, job matching, skill tracking, projects, and interview preparation.

## Vision
CareerOS is designed to grow with a student from college to their first major tech role.

## Roadmap
- [x] Project foundation
- [ ] Profile & master resume
- [ ] Skills & projects tracker
- [x] Job description analyzer
- [ ] ATS/resume optimization
- [ ] AI interview preparation
- [ ] Job application tracker
- [ ] Career roadmap

## Current Feature: Job Analyzer v0.2
The Job Analyzer is connected end-to-end between the React frontend and Django REST API.

### API
`POST /api/analyze-job/`

Request body:
```json
{
  "job_description": "Python Developer with Django, SQL and Git...",
  "resume_text": "Python, Django, SQL, React..."
}
```

The API returns a deterministic skill match score, detected skills, matched skills, missing skills, and recommendations. This version intentionally does not claim to use an LLM; AI/LLM-powered analysis can be layered on later.

## Planned Stack
- Backend: Django + Django REST Framework
- Frontend: React + Vite
- Database: PostgreSQL
- AI: LLM API
- DevOps: Docker + GitHub Actions

## Status
🚧 Active development — Job Analyzer v0.2 connected

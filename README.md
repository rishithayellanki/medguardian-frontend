# MedGuardian AI — Frontend

React + TypeScript frontend for **MedGuardian AI**, an AI-powered medication safety platform that checks for drug interactions across prescriptions from multiple doctors.

🔗 **Live app:** https://medguardian-frontend.vercel.app
🔗 **Backend repo (API, architecture, full write-up):** https://github.com/rishithayellanki/medguardian-backend

---

## What this app does

- Upload prescription photos from multiple doctors/visits, or enter medicines manually
- AI (Gemini) extracts medicine name, dosage, and frequency from images
- Checks all combined medicines for interactions, with plain-English explanations of *why* an interaction matters — not just a risk label
- Explains any medicine in plain language: uses, how to take it, side effects, precautions, missed-dose guidance
- Full dark mode, persisted across sessions
- Public landing page for logged-out visitors

See the [backend repo](https://github.com/rishithayellanki/medguardian-backend) for the full architecture, AI-reliability approach, and future work list.

## Tech stack

React · TypeScript · Tailwind CSS · React Router · Axios · Vite

## Project structure

```
src/
├── api/            # API client + typed request functions
├── components/      # Shared components (Header, ThemeToggle)
├── context/          # Auth and Theme context providers
└── pages/           # Landing, Login, Signup, Upload, Results, Interactions, MedicineDetail
```

## Running locally

```bash
npm install
```

Create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:8080/api
```

```bash
npm run dev
```

App runs at `http://localhost:5173`. Requires the [backend](https://github.com/rishithayellanki/medguardian-backend) running locally (or point `VITE_API_URL` at a deployed backend instance).

## Deployment

Deployed on Vercel. The `vercel.json` rewrite rule ensures client-side routes (e.g. `/upload`, `/results`) resolve correctly on direct navigation/refresh, since this is a single-page app.

---

*This is a portfolio project. Not a substitute for professional medical advice.*
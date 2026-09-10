# CareerOS deployment

## Backend — Render
1. Create a new Web Service from this repository.
2. Root directory: `backend`
3. Build command: `pip install -r requirements-prod.txt && python manage.py collectstatic --noinput && python manage.py migrate`
4. Start command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
5. Environment variables:
   - `DJANGO_SECRET_KEY` = a strong random secret
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = `*` for the first deployment (tighten to the API hostname afterward)

## Frontend — Vercel
1. Import the same repository into Vercel.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable:
   - `VITE_API_URL` = the deployed Render API URL, without a trailing slash

The React app already sends Job Analyzer requests to `${VITE_API_URL}/api/analyze-job/`.

## Production note
The repository contains deployment configuration, but the actual Render/Vercel services must be created in accounts that have access to the repository. No provider credentials are stored in this repository.

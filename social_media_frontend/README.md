# Social Media Dashboard Frontend

Modern React frontend with:
- Persistent sidebar navigation
- Top header with avatar + settings
- Auth state (login/logout), protected routes
- Dashboard (analytics widgets) and Profile (view/edit)
- Light theme with accents #3B82F6 (primary) and #F59E0B (amber)

## Environment
Create `.env` from example:
```
cp .env.example .env
```
Set:
- `REACT_APP_API_BASE_URL` (e.g., http://localhost:3010)

## Scripts
- `npm start` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm test` — tests

## Backend Endpoints Expected
- `POST /auth/login` { email, password } -> { access_token, user? }
- `GET /users/me` -> user profile
- `PUT /users/me` -> update profile
- `GET /analytics/summary` -> { totalPosts, followers, engagementRate, growthPercent }
- `GET /analytics/recent` -> [{ id, title, likes, comments, shares }]
If your backend differs, adjust paths in `src/api/client.js` and pages accordingly.

## Routing
- `/login` unauthenticated
- `/dashboard`, `/profile` protected

## Theming
Colors and styles in `src/components/layout.css` and `src/pages/pages.css`.

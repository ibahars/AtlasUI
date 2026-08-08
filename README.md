# Atlas UI

Frontend for Atlas, a Kanban-style task management application. Built with React, Vite, and Tailwind CSS.

**Live:** [atlas.ibahars.com](https://atlas.ibahars.com/)



## Features

- User registration and login
- Persistent task board backed by a PostgreSQL API
- Drag-and-drop task management across status columns
- Task creation and editing with type, priority, and description fields
- User profile view with password change
- Responsive layout for mobile and desktop

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Drag and Drop:** @dnd-kit
- **Icons:** lucide-react
- **State Management:** React Hooks (useState, useEffect)

## Environment Variables

| Variable        | Description                          | Required |
|-----------------|----------------------------------------|----------|
| `VITE_API_URL`  | Base URL of the Atlas API backend      | Yes      |


## Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, TaskCard, TaskColumn, etc.)
│   └── UI/         # Low-level shared UI elements
├── pages/          # Top-level views (Login, Register, MainHome)
├── services/       # API communication layer
├── App.jsx
└── main.jsx
```

## Deployment

The frontend is deployed via Cloudflare Pages with continuous deployment from the main branch. Set `VITE_API_URL` in the Cloudflare Pages environment variables to point to the production API.

## License

MIT

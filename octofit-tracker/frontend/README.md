# React + Vite

This frontend uses React 19, Vite, Bootstrap, and React Router for the OctoFit Tracker multi-tier application.

## Environment configuration

Define the Vite environment variable `VITE_CODESPACE_NAME` in `.env.local` when running the app from a GitHub Codespaces URL. For example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If this variable is not defined, the app falls back to the local backend at `http://localhost:8000`.

## API usage

The presentation tier calls the backend through URLs such as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

The frontend also handles both array responses and paginated payloads such as `{ results: [] }` or `{ data: [] }`.

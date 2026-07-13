import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './api'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseExample = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/'

  return (
    <div className="min-vh-100 bg-light">
      <header className="border-bottom bg-white">
        <div className="container py-4">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">OctoFit Tracker</span>
          <h1 className="display-5 fw-bold">Track workouts, teams, and progress in one place.</h1>
          <p className="lead text-muted mb-4">
            Browse users, teams, activities, workouts, and leaderboard data served from the Express API.
          </p>
          <p className="text-muted mb-4">
            API base: <strong>{getApiBaseUrl('users')}</strong>
          </p>
          <p className="text-muted small mb-4">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a GitHub Codespaces API URL. If it is unset, the app falls back to the local backend.
          </p>
          <nav className="nav flex-wrap gap-2">
            <NavLink className="btn btn-outline-secondary btn-sm" to="/">
              Overview
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-sm" to="/activities">
              Activities
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-sm" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-sm" to="/teams">
              Teams
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-sm" to="/users">
              Users
            </NavLink>
            <NavLink className="btn btn-outline-secondary btn-sm" to="/workouts">
              Workouts
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Overview apiBaseExample={apiBaseExample} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview({ apiBaseExample }) {
  return (
    <section className="row g-4">
      <div className="col-lg-7">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body p-4">
            <h2 className="h4 mb-3">Presentation tier overview</h2>
            <p className="text-muted">
              This React 19 app uses client-side routing to browse the API-backed resources exposed by the backend.
            </p>
            <div className="alert alert-primary mb-0">
              Example API host: <strong>{apiBaseExample}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body p-4">
            <h2 className="h4 mb-3">Explore</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">Users and activity logs</li>
              <li className="list-group-item px-0">Teams and leaderboard rankings</li>
              <li className="list-group-item px-0">Workout plans and recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App

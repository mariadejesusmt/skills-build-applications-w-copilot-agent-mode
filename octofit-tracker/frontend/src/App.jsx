import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-4 fw-bold">Track workouts, teams, and progress in one place.</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness experience with a React frontend, an Express API, and MongoDB-backed data services.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/">
              Learn Vite
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4">What’s included</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">User profiles and activity tracking</li>
                <li className="list-group-item px-0">Team management and leaderboards</li>
                <li className="list-group-item px-0">Workout suggestions and MongoDB storage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App

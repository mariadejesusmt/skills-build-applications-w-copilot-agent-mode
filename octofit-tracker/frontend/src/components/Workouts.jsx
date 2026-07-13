import { useEffect, useState } from 'react'
import { normalizeItems } from '../api'

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
    const apiBaseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    const endpoint = `${apiBaseUrl}/api/workouts/`

    async function loadWorkouts() {
      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setItems(normalizeItems(payload))
          setLoading(false)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Suggested or logged workouts from the API.</p>
          </div>
          <span className="badge bg-secondary-subtle text-secondary-emphasis">{items.length}</span>
        </div>

        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="alert alert-info">No workouts were returned by the API.</div>
        )}

        <ul className="list-group list-group-flush">
          {items.map((item, index) => {
            const name = item.name || item.title || item.type || `Workout ${index + 1}`
            const detail = item.description || item.duration || item.goal || 'Workout plan'

            return (
              <li key={item._id || `${name}-${index}`} className="list-group-item px-0">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <strong>{name}</strong>
                    <div className="text-muted small">{detail}</div>
                  </div>
                  <span className="text-muted small">#{index + 1}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Workouts

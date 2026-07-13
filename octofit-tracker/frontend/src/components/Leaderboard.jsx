import { useEffect, useState } from 'react'
import { getApiEndpoint, normalizeItems } from '../api'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiEndpoint('leaderboard'))

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

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Competitive rankings from the public API.</p>
          </div>
          <span className="badge bg-success-subtle text-success-emphasis">{items.length}</span>
        </div>

        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="alert alert-info">No leaderboard data is available yet.</div>
        )}

        <ul className="list-group list-group-flush">
          {items.map((item, index) => {
            const name = item.name || item.user || item.username || `Entry ${index + 1}`
            const score = item.score || item.points || item.total || '—'

            return (
              <li key={item._id || `${name}-${index}`} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{index + 1}. {name}</strong>
                  </div>
                  <span className="badge bg-dark-subtle text-dark">{score}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Leaderboard

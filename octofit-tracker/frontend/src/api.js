const DEFAULT_LOCAL_API = 'http://localhost:8000'

function getApiBaseUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
  }

  return `${DEFAULT_LOCAL_API}/api/${resource}/`
}

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

async function fetchResource(resource) {
  const response = await fetch(getApiBaseUrl(resource))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeItems(payload)
}

export { fetchResource, getApiBaseUrl, normalizeItems }

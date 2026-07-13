const DEFAULT_LOCAL_API = 'http://localhost:8000'

function getApiBaseUrl(apiBaseUrl = DEFAULT_LOCAL_API) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return apiBaseUrl || DEFAULT_LOCAL_API
}

function getApiEndpoint(resource, apiBaseUrl = DEFAULT_LOCAL_API) {
  const baseUrl = getApiBaseUrl(apiBaseUrl)
  return `${baseUrl}/api/${resource}/`
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

  if (Array.isArray(payload.records)) {
    return payload.records
  }

  return []
}

async function fetchResource(resource, apiBaseUrl = DEFAULT_LOCAL_API) {
  const response = await fetch(getApiEndpoint(resource, apiBaseUrl))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeItems(payload)
}

export { fetchResource, getApiBaseUrl, getApiEndpoint, normalizeItems }

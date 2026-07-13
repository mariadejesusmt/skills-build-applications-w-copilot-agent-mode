const codespaceName = process.env.CODESPACE_NAME;

export function getApiBaseUrl(): string {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function getApiUrl(path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

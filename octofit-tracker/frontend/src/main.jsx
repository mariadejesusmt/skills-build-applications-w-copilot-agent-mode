import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App apiBaseUrl={apiBaseUrl} />
    </BrowserRouter>
  </StrictMode>,
)

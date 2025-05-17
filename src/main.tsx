import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/router.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  </StrictMode>
)

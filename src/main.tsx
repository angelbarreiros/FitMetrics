import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/router.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_CAPTCHA_SITE_KEY as string}>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </GoogleReCaptchaProvider>
  </StrictMode>
)

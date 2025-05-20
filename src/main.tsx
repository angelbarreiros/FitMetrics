import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/router.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { GoogleReCaptchaProvider } from '@google-recaptcha/react'
import { onMount } from './mount.ts'
import { userStore } from './stores/userStore.ts'
import { FullScreenLoader } from './components/shared/FullScreenLoader.tsx'
const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { logout, checkUser } = userStore(state => (state))
  useEffect(() => {
    onMount(checkUser, logout).finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <StrictMode>
      <GoogleReCaptchaProvider type='v3' siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY as string}>
        <HelmetProvider>
          <Router />
        </HelmetProvider>
      </GoogleReCaptchaProvider>
    </StrictMode>)
}

createRoot(document.getElementById('root')!).render(<RootComponent />)

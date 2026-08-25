import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import './styles/index.css'
import './i18n'

import { App } from './app/App'

/**
 * The backend is mocked at the network layer, so the app talks real HTTP and
 * nothing has to change in components when a server appears.
 */
async function bootstrap() {
  // On by default while there is no server. Set VITE_ENABLE_MOCKS=false once a
  // real API exists; the mock bundle is a dynamic import, so it drops out then.
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'false') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass', quiet: true })
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CmsProvider } from './context/CmsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CmsProvider>
      <App />
    </CmsProvider>
  </StrictMode>,
)

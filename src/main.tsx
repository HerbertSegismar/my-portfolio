import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Footer from './components/Footer.tsx'

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <div className='w-screen min-h-screen bg-gradient-to-b from-white via-amber-100 to-blue-400'>
        <App />
        <Footer />
      </div>
    </StrictMode>
);

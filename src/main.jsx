import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.css'

/**
 * Application Entry Point
 * Provides necessary context providers:
 * - ThemeProvider: Manages dark/light theme
 * - HelmetProvider: Handles SEO meta tags
 * - BrowserRouter: Enables client-side routing with dynamic basename
 *
 * basename is determined by the import.meta.env.BASE_URL
 * which is set by Vite based on the base config:
 * - GitHub Pages: /rahman-porfolio/
 * - Render.com: /
 */
const basename = import.meta.env.BASE_URL || '/'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
)

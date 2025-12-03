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
 * - BrowserRouter: Enables client-side routing
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
)

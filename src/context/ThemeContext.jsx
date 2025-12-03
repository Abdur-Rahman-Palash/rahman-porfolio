import React, { createContext, useContext, useEffect, useState } from 'react'

/**
 * ThemeContext - Manages application theme (light/dark mode)
 * Provides global theme state and toggle function to all components
 * Persists theme preference to localStorage
 */
const ThemeContext = createContext()

/**
 * ThemeProvider Component
 * Wraps the application to provide theme context to all child components
 * 
 * Usage:
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('app-theme') || 'light'
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } catch (e) {
      console.warn('Failed to load theme from localStorage:', e)
    }
  }, [])

  // Apply theme to DOM
  const applyTheme = (themeValue) => {
    try {
      document.documentElement.setAttribute('data-theme', themeValue)
      if (themeValue === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      console.warn('Failed to apply theme:', e)
    }
  }

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
    try {
      localStorage.setItem('app-theme', newTheme)
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e)
    }
  }

  // Always provide context, even before mount to prevent hydration errors
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme Hook
 * Custom hook to access theme context
 * 
 * Usage:
 * const { theme, toggleTheme } = useTheme()
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

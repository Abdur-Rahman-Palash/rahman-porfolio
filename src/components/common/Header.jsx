import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import useTheme from '../../hooks/useTheme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-base-100 shadow-sm border-b border-base-200">
      <div className="w-full max-w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-lg sm:text-xl font-bold hover:opacity-80 transition">
            My Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 flex-1 justify-center">
            <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
            <Link to="/projects" className="btn btn-ghost btn-sm">Projects</Link>
            <Link to="/about" className="btn btn-ghost btn-sm">About</Link>
          </nav>

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button onClick={toggleTheme} className="btn-outline" aria-label="Toggle theme">
              {theme === 'dark' ? '🌙' : '☀️'}
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden btn btn-ghost btn-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-2 mt-3 pt-3 border-t border-base-200">
            <Link to="/" className="btn btn-ghost btn-sm justify-start" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/projects" className="btn btn-ghost btn-sm justify-start" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm justify-start" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

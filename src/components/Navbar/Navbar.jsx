import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

/**
 * Advanced Navbar Component
 * Features:
 * - Responsive mobile/desktop navigation
 * - Dark/Light theme toggle with Context
 * - Sticky header with blur effect on scroll
 * - Smooth navigation with active link indication
 * - Accessible ARIA attributes and keyboard navigation
 * - Framer Motion animations for mobile menu
 * - Professional styling with Tailwind + DaisyUI
 */

// Navigation links configuration
const NAV_LINKS = [
  { href: '/', label: 'Home', ariaLabel: 'Navigate to Home' },
  { href: '/about', label: 'About', ariaLabel: 'Navigate to About' },
  { href: '/skills', label: 'Skills', ariaLabel: 'Navigate to Skills' },
  { href: '/projects', label: 'Projects', ariaLabel: 'Navigate to Projects' },
  { href: '/contact', label: 'Contact', ariaLabel: 'Navigate to Contact' },
]

// Mobile menu animation variants
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2 },
  }),
}

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState(location.pathname)

  /**
   * Handle scroll event for sticky header with blur effect
   * Adds background blur when page is scrolled down
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Update active link when route changes
   */
  useEffect(() => {
    setActiveLink(location.pathname)
    setIsOpen(false) // Close mobile menu on navigation
  }, [location.pathname])

  /**
   * Close mobile menu when clicking outside
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  /**
   * Render NavLink with active state styling
   */
  const renderNavLink = ({ href, label, ariaLabel }) => (
    <NavLink
      key={href}
      to={href}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
          isActive
            ? 'text-primary font-semibold'
            : 'text-base-content hover:text-primary'
        }`
      }
      onClick={() => setIsOpen(false)}
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Active link underline animation */}
          {isActive && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <>
      {/* Main Navbar Container */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-base-100/80 backdrop-blur-md shadow-lg'
            : 'bg-base-100 shadow-sm'
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <nav
          className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4"
          role="navigation"
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="flex items-center gap-2 group"
                aria-label="My Portfolio Home"
              >
                {/* Animated Logo */}
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/50 rounded-lg flex items-center justify-center font-bold text-white group-hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  AP
                </motion.div>

                {/* Brand Text */}
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map(renderNavLink)}
            </div>

            {/* Right Controls: Hire Button + Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Hire Me Button (left of theme toggle) */}
              <motion.a
                href="https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20or%20hire%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-3 py-2 rounded-md text-sm font-medium border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-200 mr-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ pointerEvents: 'auto' }}
                aria-label="Hire me via WhatsApp"
                title="Hire me"
              >
                💼 Hire Me
              </motion.a>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Current theme: ${theme}`}
              >
                {theme === 'dark' ? (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.414-1.414a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.button>

              {/* Mobile Menu Toggle Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    className="transition-all duration-300"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu with Animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden border-t border-base-300 mt-3 pt-3"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-base-content hover:bg-base-200'
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}

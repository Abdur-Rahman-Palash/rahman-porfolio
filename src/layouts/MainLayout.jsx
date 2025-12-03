import React from 'react'
import Footer from '../components/Footer'

/**
 * MainLayout Component
 * Provides consistent layout structure across all pages
 * Navbar is rendered at the App level for better state management
 * 
 * Features:
 * - Flexible content area with proper spacing
 * - Sticky footer with cyber neon design
 * - Responsive design
 * - Handles both full-height and regular sections
 */
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Main content - allows full-height sections like Hero */}
      <main className="flex-1 w-full">
        {/* Check if children is a full-height component (like Hero) */}
        {/* If not, wrap with responsive padding */}
        {React.isValidElement(children) && children.type?.name === 'Hero' ? (
          children
        ) : (
          <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <div className="w-full max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

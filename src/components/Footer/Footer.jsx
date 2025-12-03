import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUICK_LINKS, SOCIAL_LINKS, CONTACT_INFO, FOOTER_CONFIG, LEGAL_LINKS } from './data'
import './footer.css'

/**
 * Tech Cyber Circuit Board Footer Component
 *
 * Features:
 * - Dark cyberpunk design with neon cyan/magenta accents
 * - Animated circuit board background with SVG traces
 * - Glass morphism panels with backdrop blur
 * - Neon node ripple effects on social icons
 * - Semantic HTML structure with proper accessibility
 * - Newsletter signup with validation
 * - Responsive grid layout (adapts to mobile/tablet/desktop)
 * - Framer Motion animations for entrance and interactions
 * - Performance optimized with CSS transforms
 *
 * Props: None (uses centralized data.js configuration)
 *
 * Future Backend Integration:
 * - Newsletter: Replace FOOTER_CONFIG.NEWSLETTER_API_URL with your API endpoint
 * - Example EmailJS or backend API handler in handleNewsletterSubmit()
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const slideInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

// Neon Node Ripple Effect Component
function NeonNode({ icon, name, url, color, ariaLabel }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorMap = {
    cyan: {
      border: 'border-cyan-400',
      glow: 'rgba(0, 217, 255, 0.5)',
      shadow: '0 0 20px rgba(0, 217, 255, 0.5)',
    },
    blue: {
      border: 'border-blue-400',
      glow: 'rgba(59, 130, 246, 0.5)',
      shadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    },
    purple: {
      border: 'border-purple-400',
      glow: 'rgba(168, 85, 247, 0.5)',
      shadow: '0 0 20px rgba(168, 85, 247, 0.5)',
    },
  }

  const currentColor = colorMap[color] || colorMap.cyan

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 ${currentColor.border} flex items-center justify-center text-2xl md:text-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm neon-node group transition-all duration-300`}
      style={{
        boxShadow: isHovered ? currentColor.shadow : '0 0 10px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, y: -8 }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
      role="link"
    >
      {/* Animated Border Pulse */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-transparent ${currentColor.border}`}
        animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Glow Background */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
        style={{
          background: `radial-gradient(circle, ${currentColor.glow}, transparent)`,
          zIndex: -1,
        }}
      />

      {/* Icon */}
      <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>

      {/* Ripple Effect */}
      {isHovered && (
        <>
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${currentColor.border}`}
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: 'none' }}
          />
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${currentColor.border}`}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ pointerEvents: 'none' }}
          />
        </>
      )}
    </motion.a>
  )
}

// Quick Links Section
function QuickLinksSection() {
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <h4 className="text-lg font-bold text-cyan-400 uppercase tracking-widest">
        Quick Links
      </h4>
      <nav className="space-y-2" aria-label="Footer quick navigation">
        {QUICK_LINKS.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium group"
            whileHover={{ x: 5 }}
            aria-label={`Navigate to ${link.label}`}
          >
            <span className="group-hover:text-cyan-400 transition-colors">
              {link.icon}
            </span>{' '}
            {link.label}
          </motion.a>
        ))}
      </nav>
    </motion.div>
  )
}

// Contact Info Section
function ContactSection() {
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <h4 className="text-lg font-bold text-blue-400 uppercase tracking-widest">
        Contact
      </h4>
      <div className="space-y-3 text-sm">
        {/* Email */}
        <motion.a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
          whileHover={{ x: 5 }}
          aria-label={`Send email to ${CONTACT_INFO.email}`}
        >
          <span className="text-lg">✉️</span>
          <span className="font-mono text-xs md:text-sm break-all">{CONTACT_INFO.email}</span>
        </motion.a>

        {/* Phone */}
        <motion.a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
          whileHover={{ x: 5 }}
          aria-label={`Call ${CONTACT_INFO.phone}`}
        >
          <span className="text-lg">📱</span>
          <span className="font-mono text-xs md:text-sm">{CONTACT_INFO.phone}</span>
        </motion.a>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-lg">📍</span>
          <span className="text-xs md:text-sm">{CONTACT_INFO.location}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Newsletter Signup Section
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with your actual backend endpoint
      // Example implementation:
      // const response = await fetch(FOOTER_CONFIG.NEWSLETTER_API_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })
      // const data = await response.json()
      // if (!response.ok) throw new Error(data.message)

      // Placeholder: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setEmail('')

      // Auto-dismiss after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('Subscription failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <h4 className="text-lg font-bold text-purple-400 uppercase tracking-widest">
        Newsletter
      </h4>
      <p className="text-xs md:text-sm text-gray-400">
        Get updates on new projects and tech insights.
      </p>

      <form onSubmit={handleNewsletterSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border-2 border-purple-400/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-400 transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            aria-label="Email for newsletter subscription"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border-2 border-purple-400 text-purple-400 text-sm font-bold hover:bg-purple-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Subscribe to newsletter"
        >
          {isLoading ? '⏳ Subscribing...' : '🚀 Subscribe'}
        </motion.button>
      </form>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-2 rounded-lg bg-green-400/10 border border-green-400 text-green-400 text-xs font-bold text-center"
          >
            ✅ Subscribed! Check your email.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Footer Component
export default function Footer() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer className="relative w-full bg-black border-t-2 border-cyan-400/50 overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Top Border Glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 255, 255, 0.3)',
              '0 0 30px rgba(0, 255, 255, 0.8)',
              '0 0 10px rgba(0, 255, 255, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Grid Background */}
        <div className="footer-circuit absolute inset-0 opacity-8" />

        {/* Animated Circuit Traces - Enhanced */}
        <svg className="footer-traces absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 255, 255, 0.6)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.6)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal traces */}
          <line x1="0%" y1="15%" x2="100%" y2="15%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.8" />
          <line x1="0%" y1="35%" x2="100%" y2="35%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.6" />
          <line x1="0%" y1="55%" x2="100%" y2="55%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.6" />
          <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.8" />

          {/* Vertical traces */}
          <line x1="15%" y1="0%" x2="15%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.6" />
          <line x1="35%" y1="0%" x2="35%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.7" />
          <line x1="65%" y1="0%" x2="65%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.7" />
          <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1.5" filter="url(#glow)" opacity="0.6" />

          {/* Circuit nodes - Enhanced */}
          <circle cx="15%" cy="15%" r="4" fill="rgba(0, 255, 255, 0.8)" filter="url(#glow)" />
          <circle cx="85%" cy="15%" r="4" fill="rgba(168, 85, 247, 0.8)" filter="url(#glow)" />
          <circle cx="15%" cy="75%" r="4" fill="rgba(168, 85, 247, 0.8)" filter="url(#glow)" />
          <circle cx="85%" cy="75%" r="4" fill="rgba(0, 255, 255, 0.8)" filter="url(#glow)" />
          <circle cx="50%" cy="50%" r="5" fill="rgba(59, 130, 246, 0.6)" filter="url(#glow)" />
        </svg>

        {/* Animated Glow Elements - More Vibrant */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Spotlight Section */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Spotlight Text */}
            <motion.div 
              className="space-y-6"
              variants={slideInUp}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
            >
              <div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 leading-tight">
                  Let's Build Something
                  <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Amazing</span>
                </h3>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Let's collaborate and create something extraordinary together.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#contact"
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-cyan-400 text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/20 transition-all duration-300 text-center neon-button"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 Start a Project
                </motion.a>
                <motion.a
                  href="mailto:contact@example.com"
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-purple-400 text-purple-400 bg-purple-400/5 hover:bg-purple-400/20 transition-all duration-300 text-center neon-button"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 Send Email
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Social Icons + Stats */}
            <motion.div
              className="flex flex-col items-center md:items-end gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
            >
              {/* Social Icons - Enhanced */}
              <div className="flex gap-6 flex-wrap justify-center md:justify-end">
                {SOCIAL_LINKS.map((social, idx) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.1 + 0.2, duration: 0.6 }}
                  >
                    <NeonNode
                      icon={social.icon}
                      name={social.name}
                      url={social.url}
                      color={social.color}
                      ariaLabel={social.ariaLabel}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-6 bg-gradient-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6"
                variants={itemVariants}
                whileHover={{ borderColor: 'rgba(0, 255, 255, 0.4)', y: -5 }}
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">50+</p>
                  <p className="text-xs text-gray-400 uppercase mt-1">Projects</p>
                </div>
                <div className="text-center border-l border-r border-cyan-400/20">
                  <p className="text-2xl font-bold text-blue-400">100%</p>
                  <p className="text-xs text-gray-400 uppercase mt-1">Dedicated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">24/7</p>
                  <p className="text-xs text-gray-400 uppercase mt-1">Support</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider with Glow */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto w-4/5"
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Middle Section: Links Grid */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {/* Quick Links - Enhanced */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-bold text-cyan-400 uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Navigation
              </h4>
              <nav className="space-y-3" aria-label="Footer quick navigation">
                {QUICK_LINKS.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm font-medium group flex items-center gap-2"
                    whileHover={{ x: 8, color: '#00ffff' }}
                    aria-label={`Navigate to ${link.label}`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Contact - Enhanced */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-bold text-blue-400 uppercase tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contact
              </h4>
              <div className="space-y-3 text-sm">
                <motion.a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                  aria-label={`Send email to ${CONTACT_INFO.email}`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">✉️</span>
                  <span className="font-mono text-xs md:text-sm break-all">{CONTACT_INFO.email}</span>
                </motion.a>

                <motion.a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                  aria-label={`Call ${CONTACT_INFO.phone}`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">📱</span>
                  <span className="font-mono text-xs md:text-sm">{CONTACT_INFO.phone}</span>
                </motion.a>

                <div className="flex items-center gap-3 text-gray-300 group">
                  <span className="text-xl group-hover:scale-125 transition-transform">📍</span>
                  <span className="text-xs md:text-sm">{CONTACT_INFO.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Newsletter - Enhanced (use NewsletterSection component) */}
            <NewsletterSection />

            {/* Branding - Enhanced */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-bold text-cyan-400 uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                About
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-gray-200 font-bold text-base">{FOOTER_CONFIG.brandName}</p>
                <p className="text-gray-400 text-xs italic">{FOOTER_CONFIG.brandTagline}</p>
                <p className="text-gray-500 text-xs leading-relaxed pt-2">
                  💻 Building beautiful, performant web experiences with React, Tailwind, and modern JavaScript.
                </p>
                <div className="pt-2 text-xs text-cyan-400/70 font-mono">
                  &lt;/ Full Stack Developer &gt;
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto w-4/5"
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        {/* Bottom Section: Copyright & Legal */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Copyright */}
            <motion.p 
              className="text-xs md:text-sm text-gray-500 font-mono"
              whileHover={{ color: '#00ffff' }}
            >
              © {FOOTER_CONFIG.currentYear} <span className="text-cyan-400 font-bold">{FOOTER_CONFIG.brandName}</span>. All rights reserved. 🚀
            </motion.p>

            {/* Legal Links */}
            <nav className="flex gap-4 md:gap-6 flex-wrap justify-center" aria-label="Legal information">
              {LEGAL_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-xs md:text-sm text-gray-500 hover:text-cyan-400 transition-all duration-300 font-medium"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  aria-label={link.label}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Decorative Bottom Border with Shimmer */}
          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent relative overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent to-cyan-400 blur-sm"
              animate={{ x: ['0%', '400%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Footer Signature */}
          <motion.div
            className="mt-6 text-center text-xs text-gray-600 font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p>
              Made with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-red-500">❤️</motion.span> by <span className="text-cyan-400 font-bold">Abdur Rahman</span>
            </p>
            <p className="mt-2 text-gray-700">
              <span className="text-purple-400">&lt;</span><span className="text-cyan-400">Frontend Developer</span><span className="text-purple-400">&gt;</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '../common/SEOHead'
import './hero.css'

/**
 * Cyber Neon Hero Section
 * Features:
 * - Full height responsive hero with neon aesthetic
 * - Typing animation for profession
 * - Framer Motion animations (fade, slide, flicker)
 * - Neon-styled profile image with glow effect
 * - Social icons with neon hover effects
 * - Animated background with grid and gradient
 * - Interactive particles following mouse movement
 * - Mobile and desktop responsive design
 * - SEO optimized with proper heading tags
 */

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const glowVariants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(0, 255, 255, 0.3)',
      '0 0 40px rgba(0, 255, 255, 0.6)',
      '0 0 20px rgba(0, 255, 255, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
}

// Typing animation component
function TypingText({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex(index + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [index, text, speed])

  return (
    <span className="inline-block">
      {displayedText}
      {index < text.length && (
        <motion.span
          className="inline-block w-1 h-8 ml-1 bg-cyan-400 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  )
}

// Floating particles component for interactive background
function FloatingParticles() {
  const [particles, setParticles] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))
    setParticles(initialParticles)
  }, [])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/50"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: (mousePos.x - window.innerWidth / 2) * 0.05,
            y: (mousePos.y - window.innerHeight / 2) * 0.05,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      ))}
    </div>
  )
}

// Social icons component
function SocialIcons() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com',
      color: 'hover:text-cyan-400 hover:shadow-cyan',
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400 hover:shadow-blue',
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com',
      color: 'hover:text-blue-300 hover:shadow-blue',
    },
  ]

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socialLinks.map((social, i) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 ${social.color} neon-glow`}
          whileHover={{
            scale: 1.2,
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
          aria-label={`Follow us on ${social.name}`}
        >
          {social.icon === 'github' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          {social.icon === 'linkedin' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.809 0-9.731h3.554v1.375c.428-.659 1.191-1.596 2.897-1.596 2.117 0 3.704 1.384 3.704 4.362v5.59zM5.337 9.432c-1.144 0-1.915-.759-1.915-1.71 0-.955.77-1.71 1.916-1.71 1.144 0 1.915.759 1.915 1.71 0 .955-.771 1.71-1.916 1.71zm1.575 11.02H3.762V9.721h3.15v10.731zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          )}
          {social.icon === 'facebook' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )}
        </motion.a>
      ))}
    </div>
  )
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <SEOHead
        title="Frontend React Developer - Cyber Neon Portfolio"
        description="I'm a passionate Frontend React Developer specializing in modern web technologies and interactive user experiences."
      />

      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Neon Grid Background */}
          <div className="neon-grid absolute inset-0 opacity-20" />

          {/* Animated Gradient Glow */}
          <motion.div
            className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Main Content */}
        <motion.div
          className="relative z-10 h-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          {/* Profile Image */}
          <motion.div
            className="mb-8 md:mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40"
              animate={glowVariants.pulse}
            >
              {/* Neon Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 neon-border" />
              <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-50 scale-110 neon-border" />

              {/* Profile Image */}
              <img
                src="https://i.ibb.co/6cd1z1Nq/palash-2.jpg"
                alt="Palash — Frontend Developer"
                className="w-full h-full rounded-full object-cover border-2 border-cyan-300"
              />
            </motion.div>
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-4 md:mb-8"
            variants={itemVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 neon-text-glow">
              Abdur Rahman
            </span>
          </motion.h1>

          {/* Profession with Typing Animation */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-4xl text-center mb-6 md:mb-10 font-mono h-12 md:h-16 flex items-center justify-center"
            variants={itemVariants}
          >
            <span className="text-cyan-400 neon-text-glow">
              &lt; <TypingText text="Frontend React Developer" speed={80} /> /&gt;
            </span>
          </motion.h2>

          {/* Intro Paragraph */}
          <motion.p
            className="max-w-2xl text-center text-gray-300 text-sm sm:text-base md:text-lg mb-8 md:mb-12 leading-relaxed"
            variants={itemVariants}
          >
            I'm passionate about creating stunning, interactive user experiences with
            <span className="text-cyan-400 font-semibold"> React</span>,
            <span className="text-blue-400 font-semibold"> Tailwind CSS</span>, and
            <span className="text-purple-400 font-semibold"> Modern JavaScript</span>.
            I specialize in building responsive web applications with a focus on performance
            and beautiful design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-16 w-full sm:w-auto justify-center"
            variants={itemVariants}
          >
            {/* Hire Me Button */}
            <motion.a
              href="https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20or%20hire%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-bold text-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 neon-button inline-block text-center"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              💼 Hire Me
            </motion.a>

            {/* Download CV Button */}
            <motion.a
              href="/cv.json"
              download="Abdur_Rahman_CV.json"
              className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-bold text-lg border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 neon-button inline-block text-center"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              📄 Download CV
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants}>
            <SocialIcons />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center">
              <p className="text-cyan-400 text-sm mb-2 font-mono">Scroll to explore</p>
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

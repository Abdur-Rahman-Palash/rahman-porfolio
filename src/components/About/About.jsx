import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEOHead from '../common/SEOHead'
import './about.css'

/**
 * Cyber Neon About Section
 * Features:
 * - Section title with neon underline animation
 * - Two-column responsive layout
 * - Professional image with neon glow frame
 * - Personal details with neon icons
 * - Animated stat counters
 * - Framer Motion animations (slide, fade, hologram flicker)
 * - Download CV button with pulse animation
 * - Fully responsive and accessible
 * - SEO optimized with semantic tags
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
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

// Counter Animation Component
function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration * 100)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 10)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span className="text-3xl md:text-4xl font-bold text-cyan-400">{count}+</span>
}

// Personal Details Component
function PersonalDetails() {
  const details = [
    { label: 'Name', value: 'Abdur Rahman', icon: '👤' },
    { label: 'Location', value: 'Bangladesh', icon: '📍' },
    { label: 'Email', value: 'your@email.com', icon: '✉️' },
    { label: 'Experience', value: '3+ Years', icon: '⏱️' },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {details.map((detail, i) => (
        <motion.div
          key={detail.label}
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-cyan-400/30 rounded-lg p-4 md:p-5 neon-card hover:border-cyan-400 transition-all duration-300 group"
          variants={itemVariants}
          whileHover={{
            borderColor: 'rgba(0, 255, 255, 0.6)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">
              {detail.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-mono">
                {detail.label}
              </p>
              <p className="text-sm md:text-base font-semibold text-cyan-300 truncate">
                {detail.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Stats Component with Counters
function StatsSection() {
  const stats = [
    { label: 'Projects Completed', value: 25 },
    { label: 'Technologies Mastered', value: 15 },
    { label: 'Happy Clients', value: 12 },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-400/30 rounded-lg neon-stat-card group hover:border-cyan-400 transition-all duration-300"
          variants={itemVariants}
          whileHover={{
            y: -5,
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
          }}
        >
          <div className="mb-4 flex justify-center">
            <AnimatedCounter target={stat.value} />
          </div>
          <p className="text-sm md:text-base text-gray-300 font-medium uppercase tracking-wide">
            {stat.label}
          </p>
          <div className="mt-3 h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto group-hover:w-full transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <SEOHead
        title="About Me — Frontend React Developer"
        description="Learn about my journey as a React developer, skills, experience, and what I'm passionate about."
      />

      <section className="relative py-16 md:py-24 w-full bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic Grid Background */}
          <div className="about-grid absolute inset-0 opacity-10" />

          {/* Animated Glow Elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Title */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                About Me
              </span>
            </h2>
            {/* Neon Underline */}
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto about-underline"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            {/* Left Column: Image */}
            <motion.div
              className="flex justify-center md:justify-start"
              variants={slideInLeft}
            >
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                animate={glowVariants.pulse}
                whileHover={{ y: -10 }}
              >
                {/* Multiple Neon Rings */}
                <div className="absolute inset-0 rounded-lg border-2 border-cyan-400 about-neon-border" />
                <div className="absolute inset-0 rounded-lg border-2 border-purple-400 opacity-50 scale-110 about-neon-border" />
                <div className="absolute inset-0 rounded-lg border-2 border-blue-400 opacity-30 scale-120 about-neon-border" />

                {/* Image */}
                <img
                  src="https://i.ibb.co/6cd1z1Nq/palash-2.jpg"
                  alt="Palash — Frontend Developer"
                  className="w-full h-full rounded-lg object-cover border-2 border-cyan-300 shadow-2xl"
                />

                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-cyan-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡ Available
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column: Bio and Details */}
            <motion.div variants={slideInRight}>
              {/* Bio */}
              <motion.div className="mb-8" variants={itemVariants}>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                  Hi! I'm a passionate <span className="text-cyan-400 font-semibold">Frontend React Developer</span> with
                  over 3 years of experience building beautiful, interactive web applications. My journey in web
                  development started with a curiosity to create engaging user experiences.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I specialize in <span className="text-blue-400 font-semibold">React.js</span>,{' '}
                  <span className="text-purple-400 font-semibold">Tailwind CSS</span>, and modern JavaScript. I'm
                  dedicated to writing clean, maintainable code and delivering projects that exceed client expectations.
                </p>
              </motion.div>

              {/* Personal Details */}
              <PersonalDetails />

              {/* Download CV Button */}
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <motion.button
                  className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-bold text-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 neon-button about-pulse-button"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  📄 Download CV
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <StatsSection />
        </div>
      </section>
    </>
  )
}

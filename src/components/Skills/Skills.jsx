import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SkillRing from './SkillRing'
import SEOHead from '../common/SEOHead'
import './skills.css'

/**
 * Cyber Neon Skills Section
 * Features:
 * - Section title with glowing neon underline
 * - Grid layout (3 columns desktop, 2 tablet, 1 mobile)
 * - Reusable SkillRing components with neon effects
 * - Animated holographic particles background
 * - Framer Motion fade-in and stagger animations
 * - Semantic HTML structure
 * - Responsive and accessible
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

// Skills Data
const SKILLS_DATA = [
  {
    name: 'HTML',
    percentage: 95,
    color: 'cyan',
    description: 'Semantic HTML5 structure',
    icon: '🏗️',
  },
  {
    name: 'CSS',
    percentage: 92,
    color: 'purple',
    description: 'Flexbox, Grid, Animations',
    icon: '🎨',
  },
  {
    name: 'JavaScript',
    percentage: 94,
    color: 'blue',
    description: 'ES6+, DOM, Async/Await',
    icon: '⚡',
  },
  {
    name: 'React',
    percentage: 96,
    color: 'cyan',
    description: 'Components, Hooks, State',
    icon: '⚛️',
  },
  {
    name: 'Tailwind CSS',
    percentage: 93,
    color: 'green',
    description: 'Utility-first styling',
    icon: '🎯',
  },
  {
    name: 'Git/GitHub',
    percentage: 88,
    color: 'pink',
    description: 'Version control & collaboration',
    icon: '🔀',
  },
]

// Floating Particle Component
function FloatingSkillParticle() {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDuration = 3 + Math.random() * 4
  const randomSize = 2 + Math.random() * 6

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-sm"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Skills() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setIsLoaded(true)
    // Generate random particles for background
    setParticles(Array.from({ length: 12 }, (_, i) => i))
  }, [])

  return (
    <>
      <SEOHead
        title="Skills — Frontend React Developer"
        description="My technical skills and proficiency in HTML, CSS, JavaScript, React, Tailwind CSS, and Git."
      />

      <section className="relative py-16 md:py-24 w-full bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic Grid */}
          <div className="skills-grid absolute inset-0 opacity-10" />

          {/* Animated Gradient Mesh */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {particles.map((i) => (
            <FloatingSkillParticle key={i} />
          ))}
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
                Skills & Expertise
              </span>
            </h2>
            {/* Neon Underline */}
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto skills-underline"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-center text-gray-300 text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Proficient in modern web technologies with hands-on experience in building responsive and interactive applications.
          </motion.p>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 place-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            {SKILLS_DATA.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <SkillRing
                  skillName={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                  description={skill.description}
                  icon={skill.icon}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Description */}
          <motion.div
            className="mt-16 md:mt-20 p-6 md:p-8 rounded-lg border border-cyan-400/30 bg-gradient-to-r from-cyan-900/10 to-purple-900/10 skills-description-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{
              borderColor: 'rgba(0, 255, 255, 0.6)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4">💡 What I Do</h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I create beautiful, responsive web applications using React and modern CSS. My focus is on writing clean, maintainable code while delivering excellent user experiences. I'm passionate about performance optimization, accessibility, and staying updated with the latest web technologies.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

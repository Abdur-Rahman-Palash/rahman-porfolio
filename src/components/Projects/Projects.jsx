import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import SEOHead from '../common/SEOHead'
import './projects.css'

/**
 * Cyber Neon Projects Section
 * Features:
 * - Section title with glowing neon underline
 * - Responsive grid layout (1-3 columns)
 * - 6 project cards with 3D tilt magnetic hover
 * - Parallax image effects
 * - Glass morphism cards with backdrop blur
 * - Animated technology tags
 * - Framer Motion staggered animations
 * - Neon glow effects on hover
 * - Fully responsive and accessible
 * - SEO optimized with semantic HTML
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Sample projects data - ready for backend integration
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product catalog, shopping cart, and secure checkout.',
    image: 'https://images.unsplash.com/photo-1555092918-03d54c0aaf87?w=500&h=300&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'cyan',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team features.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    technologies: ['React', 'Firebase', 'Redux', 'Tailwind CSS'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather application with forecasting, location tracking, and beautiful UI.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Social Media Feed',
    description: 'Dynamic social feed with infinite scroll, likes, comments, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1611095461304-aa10fef9f313?w=500&h=300&fit=crop',
    technologies: ['React', 'GraphQL', 'PostgreSQL', 'WebSocket'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'green',
  },
  {
    id: 5,
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot powered by AI with natural language processing and context awareness.',
    image: 'https://images.unsplash.com/photo-1677442d019cedc3dca27c446f8d3e5e8e7e9b5f?w=500&h=300&fit=crop',
    technologies: ['React', 'OpenAI API', 'Python', 'Express', 'Framer Motion'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'pink',
  },
  {
    id: 6,
    title: 'Design System UI Kit',
    description: 'Comprehensive component library with 50+ reusable components and design tokens.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    technologies: ['React', 'Storybook', 'TypeScript', 'Tailwind CSS', 'DaisyUI'],
    liveDemo: 'https://example.com',
    sourceCode: 'https://github.com',
    color: 'cyan',
  },
]

// Floating Particle Component
function FloatingProjectParticle() {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDuration = 4 + Math.random() * 5
  const randomSize = 2 + Math.random() * 8

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
        y: [0, -40, 0],
        x: [0, Math.random() * 30 - 15, 0],
        opacity: [0.2, 0.7, 0.2],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Projects() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setIsLoaded(true)
    // Generate random particles for background
    setParticles(Array.from({ length: 15 }, (_, i) => i))
  }, [])

  return (
    <>
      <SEOHead
        title="Projects — Frontend React Developer"
        description="Explore my portfolio of web projects built with React, Tailwind CSS, and modern web technologies."
      />

      <section className="relative py-16 md:py-24 w-full bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic Grid */}
          <div className="projects-grid absolute inset-0 opacity-10" />

          {/* Animated Gradient Mesh */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -60, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 14, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {particles.map((i) => (
            <FloatingProjectParticle key={i} />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Title */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Featured Projects
              </span>
            </h2>
            {/* Neon Underline */}
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto projects-underline"
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
            A showcase of my recent work featuring full-stack applications, interactive tools, and innovative solutions built with modern technologies.
          </motion.p>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            {PROJECTS_DATA.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                liveDemo={project.liveDemo}
                sourceCode={project.sourceCode}
                color={project.color}
                index={project.id - 1}
              />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 md:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-gray-300 text-base md:text-lg mb-6">
              Interested in seeing more? Check out my GitHub profile for additional projects and contributions.
            </p>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-cyan-400 text-cyan-400 font-bold hover:bg-cyan-400/10 transition-all duration-300 neon-button"
              whileHover={{
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🔗 Visit GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

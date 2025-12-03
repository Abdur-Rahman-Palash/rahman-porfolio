import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './projects.css'

/**
 * ProjectCard Component
 * Features:
 * - 3D tilt effect based on mouse position (magnetic hover)
 * - Parallax image effect on hover
 * - Neon glowing borders and box shadows
 * - Glass morphism with backdrop blur
 * - Animated technology tags
 * - Two neon buttons: Live Demo & Source Code
 * - Smooth pulse animation on hover
 * - Fully responsive
 *
 * Props:
 * - title: string - Project title
 * - description: string - Short project description
 * - image: string - Project screenshot URL
 * - technologies: array - Tech stack (e.g., ['React', 'Tailwind', 'Node.js'])
 * - liveDemo: string - Live demo URL
 * - sourceCode: string - GitHub repository URL
 * - color: string - Neon color (cyan, purple, blue, green, pink)
 * - index: number - For stagger animation
 */

export default function ProjectCard({
  title,
  description,
  image,
  technologies = [],
  liveDemo,
  sourceCode,
  color = 'cyan',
  index = 0,
}) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [scale, setScale] = useState(1)
  const [imageShift, setImageShift] = useState({ x: 0, y: 0 })

  // Color mapping for neon effects
  const colorMap = {
    cyan: {
      border: 'border-cyan-400/50',
      glow: 'rgba(0, 217, 255, 0.3)',
      shadow: '0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.15)',
      button: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10',
      tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    },
    purple: {
      border: 'border-purple-400/50',
      glow: 'rgba(168, 85, 247, 0.3)',
      shadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.15)',
      button: 'border-purple-400 text-purple-400 hover:bg-purple-400/10',
      tag: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
    },
    blue: {
      border: 'border-blue-400/50',
      glow: 'rgba(59, 130, 246, 0.3)',
      shadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.15)',
      button: 'border-blue-400 text-blue-400 hover:bg-blue-400/10',
      tag: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
    },
    green: {
      border: 'border-green-400/50',
      glow: 'rgba(16, 185, 129, 0.3)',
      shadow: '0 0 30px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.15)',
      button: 'border-green-400 text-green-400 hover:bg-green-400/10',
      tag: 'bg-green-500/20 text-green-300 border-green-400/50',
    },
    pink: {
      border: 'border-pink-400/50',
      glow: 'rgba(236, 72, 153, 0.3)',
      shadow: '0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)',
      button: 'border-pink-400 text-pink-400 hover:bg-pink-400/10',
      tag: 'bg-pink-500/20 text-pink-300 border-pink-400/50',
    },
  }

  const currentColor = colorMap[color] || colorMap.cyan

  // 3D Tilt Effect Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate angle from center
    const angleX = (e.clientY - centerY) / 10
    const angleY = -(e.clientX - centerX) / 10

    // Clamp angles to max 15 degrees
    const clampX = Math.max(-15, Math.min(15, angleX))
    const clampY = Math.max(-15, Math.min(15, angleY))

    setTilt({ x: clampX, y: clampY })

    // Parallax image shift effect
    const shiftX = (e.clientX - centerX) / 50
    const shiftY = (e.clientY - centerY) / 50
    setImageShift({ x: shiftX, y: shiftY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setImageShift({ x: 0, y: 0 })
    setIsHovered(false)
    setScale(1)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setScale(1.02)
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  }

  const borderPulseVariants = {
    rest: { opacity: 0.5 },
    hover: {
      opacity: [0.5, 1, 0.5],
      boxShadow: [
        `0 0 10px ${currentColor.glow}`,
        `0 0 30px ${currentColor.glow}`,
        `0 0 10px ${currentColor.glow}`,
      ],
      transition: { duration: 2, repeat: Infinity },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: isHovered ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Card Container */}
      <div
        className={`relative h-full rounded-xl border-2 ${currentColor.border} overflow-hidden bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-md glass-morphism project-card`}
        style={{
          boxShadow: isHovered ? currentColor.shadow : '0 0 15px rgba(0, 0, 0, 0.3)',
          transition: isHovered ? 'none' : 'box-shadow 0.3s ease',
        }}
      >
        {/* Animated Border Pulse */}
        <motion.div
          className={`absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none ${currentColor.border}`}
          variants={borderPulseVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
        />

        {/* Image Container with Parallax */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-lg">
          {/* Image with Parallax Shift */}
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              transform: `translate(${imageShift.x}px, ${imageShift.y}px) scale(1.05)`,
              transition: isHovered ? 'none' : 'transform 0.3s ease',
            }}
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

          {/* Tech Tags Overlay */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            {technologies.slice(0, 2).map((tech, i) => (
              <motion.span
                key={tech}
                className={`text-xs font-bold px-2 py-1 rounded border ${currentColor.tag}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
          {/* Title */}
          <motion.h3
            className="text-lg md:text-xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base text-gray-300 leading-relaxed line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {description}
          </motion.p>

          {/* All Technology Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {technologies.map((tech, i) => (
              <span
                key={tech}
                className={`text-xs font-mono px-2 py-1 rounded border ${currentColor.tag} opacity-70 hover:opacity-100 transition-opacity`}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3 md:gap-4 pt-2 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {/* Live Demo Button */}
            <motion.a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 px-4 py-2 rounded border-2 font-bold text-sm md:text-base transition-all duration-300 ${currentColor.button} neon-button`}
              whileHover={{
                boxShadow: currentColor.shadow,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View live demo of ${title}`}
            >
              🌐 Live
            </motion.a>

            {/* Source Code Button */}
            <motion.a
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 px-4 py-2 rounded border-2 font-bold text-sm md:text-base transition-all duration-300 ${currentColor.button} neon-button`}
              whileHover={{
                boxShadow: currentColor.shadow,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View source code of ${title}`}
            >
              💻 Code
            </motion.a>
          </motion.div>
        </div>

        {/* Corner Glow Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/0 to-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  )
}

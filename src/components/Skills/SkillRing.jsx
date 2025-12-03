import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './skills.css'

/**
 * SkillRing Component
 * Displays a circular progress ring with neon glow effects
 *
 * Props:
 * - skillName: string - Name of the skill (e.g., "React")
 * - percentage: number - Skill proficiency percentage (0-100)
 * - color: string - Neon color (cyan, purple, blue, green, pink)
 * - description: string - Tooltip description on hover
 * - icon: string - Emoji or icon for the skill
 */

export default function SkillRing({
  skillName,
  percentage,
  color = 'cyan',
  description = 'Expert in this technology',
  icon = '⚡',
}) {
  const [isHovered, setIsHovered] = useState(false)
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Color mapping for neon effects
  const colorMap = {
    cyan: {
      stroke: '#00d9ff',
      glow: 'rgba(0, 217, 255, 0.5)',
      light: 'text-cyan-400',
      bg: 'from-cyan-900/20 to-cyan-800/10',
    },
    purple: {
      stroke: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.5)',
      light: 'text-purple-400',
      bg: 'from-purple-900/20 to-purple-800/10',
    },
    blue: {
      stroke: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.5)',
      light: 'text-blue-400',
      bg: 'from-blue-900/20 to-blue-800/10',
    },
    green: {
      stroke: '#10b981',
      glow: 'rgba(16, 185, 129, 0.5)',
      light: 'text-green-400',
      bg: 'from-green-900/20 to-green-800/10',
    },
    pink: {
      stroke: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.5)',
      light: 'text-pink-400',
      bg: 'from-pink-900/20 to-pink-800/10',
    },
  }

  const currentColor = colorMap[color] || colorMap.cyan

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const ringVariants = {
    initial: { strokeDashoffset: circumference },
    animate: {
      strokeDashoffset: strokeDashoffset,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        delay: 0.2,
      },
    },
  }

  const glowVariants = {
    rest: { opacity: 0.3 },
    hover: {
      opacity: 0.8,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Ring Container */}
      <motion.div
        className={`relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-gradient-to-br ${currentColor.bg} border border-gray-700 skill-ring-container`}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Glow Effect Background */}
        <motion.div
          className="absolute inset-0 rounded-full skill-ring-glow"
          style={{ boxShadow: `0 0 30px ${currentColor.glow}, inset 0 0 20px ${currentColor.glow}` }}
          variants={glowVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
        />

        {/* SVG Ring Progress */}
        <svg className="absolute w-full h-full transform -rotate-90" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' }}>
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
          />

          {/* Progress Ring with Glow */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="45"
            fill="none"
            stroke={currentColor.stroke}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeLinecap="round"
            filter="url(#glow)"
            variants={ringVariants}
            initial="initial"
            animate="animate"
          />

          {/* SVG Filter for Glow Effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
          <span className="text-2xl md:text-3xl filter drop-shadow-lg">{icon}</span>
          <motion.span
            className={`text-lg md:text-xl font-bold ${currentColor.light} font-mono`}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {percentage}%
          </motion.span>
        </div>

        {/* Animated Border Pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderColor: currentColor.stroke }}
          animate={isHovered ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Skill Name */}
      <motion.h3
        className={`text-center font-bold text-sm md:text-base ${currentColor.light}`}
        animate={isHovered ? { textShadow: `0 0 10px ${currentColor.glow}` } : { textShadow: 'none' }}
      >
        {skillName}
      </motion.h3>

      {/* Tooltip on Hover */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-gray-600 rounded-lg px-3 py-2 text-xs text-gray-300 whitespace-nowrap pointer-events-none z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {description}
        {/* Tooltip Arrow */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-gray-600"
        />
      </motion.div>
    </motion.div>
  )
}

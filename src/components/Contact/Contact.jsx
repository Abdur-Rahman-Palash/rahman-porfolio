import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '../common/SEOHead'
import './contact.css'

/**
 * Cyber Neon Contact Section
 * Features:
 * - Two-column layout (left: social cards, right: contact form)
 * - Glowing social icon cards with interactive tooltips
 * - QR code placeholder card for social profiles
 * - Glass morphism contact form with neon borders
 * - Form validation and accessibility
 * - Framer Motion animations (fade-in, hologram flicker)
 * - Floating cyber particles background
 * - Fully responsive (stacks vertically on mobile)
 * - Ready for EmailJS or backend integration
 * - SEO-optimized semantic HTML
 */

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
  hidden: { opacity: 0, y: 30 },
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

// Social Icons Data
const SOCIAL_ICONS = [
  {
    name: 'WhatsApp',
    icon: '💬',
    url: 'https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you',
    description: 'Message on WhatsApp',
    color: 'cyan',
  },
  {
    name: 'Email',
    icon: '✉️',
    url: 'mailto:abdurrahmanpalashbd@gmail.com?subject=Project%20Inquiry',
    description: 'Send an email',
    color: 'blue',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/Abdur-Rahman-Palash',
    description: 'View my projects',
    color: 'purple',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/abdur-rahman-palash-019b96251/',
    description: 'Connect professionally',
    color: 'cyan',
  },
  {
    name: 'Facebook',
    icon: '👥',
    url: 'https://www.facebook.com/ccabdurrahman',
    description: 'Follow on Facebook',
    color: 'blue',
  },
]

// Floating Particle Component
function FloatingContactParticle() {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDuration = 4 + Math.random() * 6
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
        y: [0, -50, 0],
        x: [0, Math.random() * 40 - 20, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Social Icon Card Component
function SocialCard({ icon, name, description, url, color, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorMap = {
    cyan: {
      border: 'border-cyan-400',
      glow: 'rgba(0, 217, 255, 0.4)',
      shadow: '0 0 30px rgba(0, 217, 255, 0.4)',
    },
    blue: {
      border: 'border-blue-400',
      glow: 'rgba(59, 130, 246, 0.4)',
      shadow: '0 0 30px rgba(59, 130, 246, 0.4)',
    },
    purple: {
      border: 'border-purple-400',
      glow: 'rgba(168, 85, 247, 0.4)',
      shadow: '0 0 30px rgba(168, 85, 247, 0.4)',
    },
  }

  const currentColor = colorMap[color] || colorMap.cyan

  return (
    <motion.div
      className="relative"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Social Icon Card */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 ${currentColor.border} flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-md social-card group`}
        style={{
          boxShadow: isHovered ? currentColor.shadow : '0 0 15px rgba(0, 0, 0, 0.3)',
          transition: isHovered ? 'none' : 'box-shadow 0.3s ease',
        }}
        whileHover={{
          scale: 1.1,
          y: -10,
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Visit my ${name} profile`}
      >
        {/* Animated Border */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-transparent ${currentColor.border}`}
          animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Glow Background */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle, ${currentColor.glow}, transparent)`,
            zIndex: -1,
          }}
        />

        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </motion.a>

      {/* Social Name Label */}
      <motion.div
        className="text-center mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <p className="text-sm md:text-base font-bold text-cyan-400">{name}</p>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-gray-600 rounded-lg px-3 py-2 text-xs text-gray-300 whitespace-nowrap pointer-events-none z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-gray-600" />
      </motion.div>
    </motion.div>
  )
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    // TODO: Integrate EmailJS or backend API
    // Example EmailJS integration:
    // emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
    //   from_name: formData.name,
    //   to_email: formData.email,
    //   message: formData.message,
    // }, 'PUBLIC_KEY')

    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={slideInRight}
      initial="hidden"
      animate="visible"
    >
      {/* Name Input */}
      <motion.div className="relative group" variants={itemVariants}>
        <label
          htmlFor="name"
          className="block text-sm font-bold text-cyan-400 mb-2 uppercase tracking-widest"
        >
          Name
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-cyan-400/30 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 contact-input"
          style={{
            borderColor:
              focusedField === 'name' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.3)',
            boxShadow:
              focusedField === 'name'
                ? '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)'
                : 'none',
          }}
          aria-label="Your full name"
          aria-required="true"
        />
      </motion.div>

      {/* Email Input */}
      <motion.div className="relative group" variants={itemVariants}>
        <label
          htmlFor="email"
          className="block text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest"
        >
          Email
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-blue-400/30 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 contact-input"
          style={{
            borderColor:
              focusedField === 'email' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)',
            boxShadow:
              focusedField === 'email'
                ? '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.1)'
                : 'none',
          }}
          aria-label="Your email address"
          aria-required="true"
        />
      </motion.div>

      {/* Message Textarea */}
      <motion.div className="relative group" variants={itemVariants}>
        <label
          htmlFor="message"
          className="block text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest"
        >
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          placeholder="Your message here..."
          rows="5"
          className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border-2 border-purple-400/30 text-white placeholder-gray-500 focus:outline-none resize-none transition-all duration-300 contact-input"
          style={{
            borderColor:
              focusedField === 'message'
                ? 'rgba(168, 85, 247, 0.8)'
                : 'rgba(168, 85, 247, 0.3)',
            boxShadow:
              focusedField === 'message'
                ? '0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 10px rgba(168, 85, 247, 0.1)'
                : 'none',
          }}
          aria-label="Your message"
          aria-required="true"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full px-8 py-3 md:py-4 rounded-lg border-2 border-cyan-400 text-cyan-400 font-bold text-lg hover:bg-cyan-400/10 transition-all duration-300 neon-button contact-submit"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
        }}
        whileTap={{ scale: 0.98 }}
        variants={itemVariants}
        aria-label="Submit contact form"
      >
        🚀 Send Message
      </motion.button>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={
          isSubmitted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ duration: 0.3 }}
        className="p-4 rounded-lg bg-green-400/10 border border-green-400 text-green-400 font-bold text-center"
      >
        ✅ Message sent successfully!
      </motion.div>
    </motion.form>
  )
}

// QR Code Card Component
function QRCodeCard() {
  const handleWhatsAppMessage = () => {
    window.open('https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you', '_blank')
  }

  return (
    <motion.div
      className="relative w-full max-w-xs mx-auto md:mx-0"
      variants={itemVariants}
      whileHover={{ y: -10 }}
    >
      <div className="relative rounded-lg border-2 border-purple-400/50 bg-gradient-to-br from-purple-900/30 to-slate-900/50 p-6 backdrop-blur-md overflow-hidden qr-card">
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent border-purple-400"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* QR Code Placeholder */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded border-2 border-purple-400/50 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all duration-300" onClick={handleWhatsAppMessage}>
            <span className="text-6xl">📱</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-purple-400 mb-1">Connect With Me</p>
            <p className="text-xs text-gray-400">Scan to view social profiles</p>
            <p className="text-xs text-gray-400 mt-2">or send message via WhatsApp</p>
            <motion.button
              onClick={handleWhatsAppMessage}
              className="mt-3 px-4 py-2 rounded border border-purple-400 text-purple-400 text-xs font-bold hover:bg-purple-400/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 Send Message
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState([])

  React.useEffect(() => {
    setIsLoaded(true)
    setParticles(Array.from({ length: 20 }, (_, i) => i))
  }, [])

  return (
    <>
      <SEOHead
        title="Contact Me — Frontend React Developer"
        description="Get in touch with me. Contact form, social profiles, and direct messaging available."
      />

      <section className="relative py-16 md:py-24 w-full bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic Grid */}
          <div className="contact-grid absolute inset-0 opacity-10" />

          {/* Animated Gradient Mesh */}
          <motion.div
            className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -50, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {particles.map((i) => (
            <FloatingContactParticle key={i} />
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
                Get In Touch
              </span>
            </h2>
            {/* Neon Underline */}
            <motion.div
              className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto contact-underline"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          {/* Contact Container */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            {/* Left Column: Social Cards */}
            <motion.div
              className="flex flex-col items-center md:items-start gap-8"
              variants={slideInLeft}
            >
              <div className="w-full space-y-8">
                {/* Social Cards */}
                <div className="grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-8">
                  {SOCIAL_ICONS.map((social, index) => (
                    <SocialCard
                      key={social.name}
                      icon={social.icon}
                      name={social.name}
                      description={social.description}
                      url={social.url}
                      color={social.color}
                      index={index}
                    />
                  ))}
                </div>

                {/* QR Code Card */}
                <QRCodeCard />

                {/* Contact Info Text */}
                <motion.div
                  className="hidden md:block p-6 rounded-lg border border-cyan-400/30 bg-cyan-900/10 backdrop-blur-md space-y-3"
                  variants={itemVariants}
                >
                  <p className="text-sm text-gray-300 leading-relaxed">
                    📧 <span className="text-cyan-400 font-bold">Email:</span> <br/> <span className="text-xs">abdurrahmanpalashbd@gmail.com</span>
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    📱 <span className="text-cyan-400 font-bold">WhatsApp:</span> <br/> <span className="text-xs">+880786433078</span>
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    📍 <span className="text-cyan-400 font-bold">Location:</span> <br/> <span className="text-xs">Dadul, Attpukurhat, Kazihal, Fulbari-5260, Dinajpur, Bangladesh</span>
                  </p>
                  <motion.a
                    href="https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 rounded border border-cyan-400 text-cyan-400 text-xs font-bold hover:bg-cyan-400/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    💬 Send Message on WhatsApp
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div className="w-full">
              <div className="p-6 md:p-8 rounded-lg border-2 border-cyan-400/30 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-md contact-form-card">
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

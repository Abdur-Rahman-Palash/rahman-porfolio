import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

/**
 * App Component
 * Main application component with routing and layout
 * Uses advanced Navbar with theme support
 */
export default function App() {
  return (
    <>
      {/* Advanced Navbar with theme toggle and mobile menu */}
      <Navbar />

      {/* Main content with responsive layout */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </>
  )
}

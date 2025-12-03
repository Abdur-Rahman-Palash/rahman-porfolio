/**
 * Footer Data Configuration
 * Centralized data for footer links, social profiles, and contact info
 * Easy to maintain and update all footer content from one place
 */

export const QUICK_LINKS = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'About', href: '/about', icon: '👤' },
  { label: 'Skills', href: '/skills', icon: '⚡' },
  { label: 'Projects', href: '/projects', icon: '🎯' },
  { label: 'Contact', href: '/contact', icon: '✉️' },
]

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com',
    color: 'cyan',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://linkedin.com',
    color: 'blue',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    name: 'Twitter',
    icon: '𝕏',
    url: 'https://twitter.com',
    color: 'purple',
    ariaLabel: 'Follow on Twitter/Threads',
  },
]

export const CONTACT_INFO = {
  email: 'contact@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Bangladesh',
}

export const FOOTER_CONFIG = {
  // Newsletter subscription endpoint (replace with your actual API)
  // Example: 'https://api.example.com/subscribe'
  NEWSLETTER_API_URL: null,
  
  // Company/Personal branding
  brandName: 'Abdur Rahman',
  brandTagline: 'Frontend Developer',
  
  // Current year for copyright
  currentYear: new Date().getFullYear(),
}

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]

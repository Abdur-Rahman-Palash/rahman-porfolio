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
    name: 'WhatsApp',
    icon: '💬',
    url: 'https://wa.me/880786433078?text=Hello%20Abdur%20Rahman%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you',
    color: 'cyan',
    ariaLabel: 'Contact me on WhatsApp',
  },
  {
    name: 'Email',
    icon: '✉️',
    url: 'mailto:abdurrahmanpalashbd@gmail.com?subject=Project%20Inquiry',
    color: 'blue',
    ariaLabel: 'Send me an email',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    url: 'https://github.com/Abdur-Rahman-Palash',
    color: 'purple',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/abdur-rahman-palash-019b96251/',
    color: 'cyan',
    ariaLabel: 'Connect on LinkedIn',
  },
  {
    name: 'Facebook',
    icon: '👥',
    url: 'https://www.facebook.com/ccabdurrahman',
    color: 'blue',
    ariaLabel: 'Follow on Facebook',
  },
]

export const CONTACT_INFO = {
  email: 'abdurrahmanpalashbd@gmail.com',
  phone: '+880786433078',
  location: 'Dadul, Attpukurhat, Kazihal, Fulbari-5260, Dinajpur, Bangladesh',
  whatsapp: '+880786433078',
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

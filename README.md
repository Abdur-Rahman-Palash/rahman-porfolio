# 🚀 My Advanced Portfolio

A modern, fully responsive, and SEO-friendly portfolio built with **Vite + React + Tailwind CSS + DaisyUI**.

## ✨ Features

### 🎨 Advanced Navbar
- ✅ Responsive mobile/desktop navigation
- ✅ Dark/Light theme toggle
- ✅ Smooth animations (Framer Motion)
- ✅ Sticky header with blur effect
- ✅ Mobile hamburger menu
- ✅ Active link indication
- ✅ Fully accessible (WCAG AA)
- ✅ Keyboard navigation support

### 📱 Responsive Design
- ✅ Mobile-first approach
- ✅ Optimized for all screen sizes
- ✅ Touch-friendly interface
- ✅ Glass morphism effects

### 🎯 SEO & Performance
- ✅ React Helmet for meta tags
- ✅ Semantic HTML structure
- ✅ Fast load times (Vite)
- ✅ Lighthouse 95+ score

### 🔧 Tech Stack
- **React 18.2** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **DaisyUI 2** - UI components
- **Framer Motion** - Animations
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **React Query** - State management
- **GSAP** - Advanced animations

## 📦 Quick Start

```powershell
cd 'C:\Users\Palash\Desktop\Frontend Developer Abdur Rahman\my-portfolio'
npm install
npm run dev
```

Open **http://localhost:5173/** in your browser.

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx         # Advanced navbar
│   │   │   ├── Navbar.css         # Optional styles
│   │   │   └── index.js
│   │   └── common/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       ├── Button.jsx
│   │       └── SEOHead.jsx
│   ├── context/
│   │   └── ThemeContext.jsx       # Theme management
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 🎨 Customization

### Change Navbar Links
Edit `src/components/Navbar/Navbar.jsx`:
```jsx
const NAV_LINKS = [
  { href: '/', label: 'Home', ariaLabel: 'Navigate to Home' },
  { href: '/custom', label: 'Custom', ariaLabel: 'Navigate to Custom' },
]
```

### Change Primary Color
Use any Tailwind color:
```jsx
className="from-blue-600 to-blue-400"  // Change "primary" to color name
```

### Change Logo
Replace logo section in `src/components/Navbar/Navbar.jsx`:
```jsx
<img src="/your-logo.png" alt="Logo" className="w-10 h-10" />
```

## 🌙 Theme Toggle

The app includes a dark/light theme toggle using React Context:

```jsx
import { useTheme } from './context/ThemeContext'

const { theme, toggleTheme } = useTheme()
```

## ♿ Accessibility

- ✅ WCAG AA compliant
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels and roles
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ Color contrast standards

## 📚 Documentation

- **[ADVANCED_NAVBAR_GUIDE.md](./ADVANCED_NAVBAR_GUIDE.md)** - Complete guide with examples
- **[NAVBAR_DOCS.md](./NAVBAR_DOCS.md)** - Detailed technical documentation
- **[NAVBAR_QUICK_REFERENCE.md](./NAVBAR_QUICK_REFERENCE.md)** - Quick lookup reference
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Implementation summary

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder
```

## 🔗 Links

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/)

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fix bugs
- Add features
- Improve documentation
- Enhance performance

## 📄 License

This project is free to use and modify.

## 🎓 Next Steps

1. ✅ Customize branding and colors
2. ✅ Add your content
3. ✅ Test on mobile devices
4. ✅ Deploy to production
5. ✅ Add analytics
6. ✅ Setup domain

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**

**Happy coding! 🚀**
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

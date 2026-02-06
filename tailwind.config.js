/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'gradient-danger': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-card': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'lg-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}


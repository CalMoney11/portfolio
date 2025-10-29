/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. CONTENT: Must point to all files using Tailwind classes
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // 2. COLORS: Mapping Tailwind utilities to your HSL CSS variables
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      
      // 3. ANIMATION & KEYFRAMES: Registering custom animations from globals.css
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        scaleIn: 'scaleIn 0.5s ease-out forwards',
        // Ensure this name matches the one used in your component
        'pulse-glow': 'pulseGlow 5s infinite alternate', 
        float: 'float 6s ease-in-out infinite',
        fadeInDown: 'fadeInDown 0.3s ease-out forwards',
      },
      
      // Keyframes must be registered, even if the definitions are in globals.css
      keyframes: {
        fadeInUp: { from: { opacity: 0 } },
        fadeIn: { from: { opacity: 0 } },
        scaleIn: { from: { opacity: 0 } },
        pulseGlow: { from: { opacity: 0.5 } },
        float: { from: { transform: 'translateY(0px)' } },
        fadeInDown: { from: { opacity: 0 } },
      },
    },
  },
  // 4. PLUGINS: Ensuring 'tailwindcss-animate' is correctly loaded
  plugins: [
    require('@tailwindcss/postcss'), // Should be fixed in postcss.config.js but good to check here too
    require('tailwindcss-animate'),
  ],
};
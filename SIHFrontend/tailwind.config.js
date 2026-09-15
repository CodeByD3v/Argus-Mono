/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        app: '#0A0A0B',
        card: '#161618',
        'card-raised': '#1D1D20',
        pill: '#1F1F22',
        'pill-active': '#2A2A2E',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-divider': 'rgba(255, 255, 255, 0.06)',
        'text-primary': '#F5F5F4',
        'text-secondary': '#9A9A9E',
        'text-tertiary': '#5C5C60',
        'accent-green': '#3ECF6E',
        'accent-red': '#E5484D',
        'accent-amber': '#F5A623',
      },
      borderRadius: {
        'card': '16px',
        'card-nested': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'card-raised': '0 12px 32px rgba(0, 0, 0, 0.5)',
        'glow-green': '0 0 10px rgba(62, 207, 110, 0.3)',
        'glow-red': '0 0 10px rgba(229, 72, 77, 0.4)',
        'glow-amber': '0 0 10px rgba(245, 166, 35, 0.35)',
      },
    },
  },
  plugins: [],
}

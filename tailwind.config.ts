import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Geist Sans"', '"Inter"', 'sans-serif'],
      },
      colors: {
        emerald: {
          500: '#10b981',
          900: '#064e3b',
          950: '#022c22',
        },
        zinc: {
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "linear-gradient(to right, #141414 1px, transparent 1px), linear-gradient(to bottom, #141414 1px, transparent 1px)",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 4s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { "backgroundPosition": "0 0" },
          to: { "backgroundPosition": "-200% 0" },
        },
        scanline: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }
      })
    },
  ],
}
export default config
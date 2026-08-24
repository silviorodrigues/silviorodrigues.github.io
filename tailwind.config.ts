import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#171717',
        card: '#1c1c1c',
        border: {
          DEFAULT: '#262626',
          hover: '#404040',
        },
        text: {
          primary: '#fafafa',
          secondary: '#e5e5e5',
          muted: '#a3a3a3',
          faint: '#737373',
          faintest: '#525252',
        },
        accent: '#6dd5ed',
      },
      borderRadius: {
        card: '12px',
        input: '10px',
        pill: '999px',
      },
      keyframes: {
        shine: {
          to: { backgroundPosition: '200% center' },
        },
      },
      animation: {
        shine: 'shine 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config

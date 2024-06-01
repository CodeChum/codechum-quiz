import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      body: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'pattern-desktop': "url('/background/desktop.svg')",
        'pattern-mobile': "url('/background/mobile.svg')",
        grid: "url('/background/grid.svg')",
      },
      colors: {
        neutral: {
          900: '#1f2730',
          800: '#28313b',
          700: '#2d3845',
          600: '#3f4e5f',
          500: '#626b77',
          400: '#88919b',
          300: '#b0b9bf',
          200: '#d1dadf',
          100: '#e2eaee',
          50: '#f0f5f9',
          0: '#ffffff',
        },
        blue: {
          DEFAULT: '#2cabe3',
          600: '#2cabe3',
          500: '#2387b2',
          400: '#269acd',
          300: '#2cabe3',
          100: '#97e2fc',
          50: '#f3fbfe',
        },
        green: {
          DEFAULT: '#38ca79',
          500: '#37a166',
          400: '#3bb672',
          300: '#38ca79',
          100: '#94edb8',
        },
        yellow: {
          500: '#e0bc5d',
          400: '#edca27',
          300: '#ffdb31',
          100: '#ffe9c2',
        },
        red: {
          DEFAULT: '#ee6450',
          500: '#bf5a4c',
          400: '#d45340',
          300: '#ee6450',
          100: '#f99d9d',
        },
        indigo: {
          DEFAULT: '#4685EE',
          300: '#4685EE',
        },
      },
      animation: {
        'pulse-slow': 'pulse 500ms ease-in-out infinite',
      },
      keyframes: {
        enter: {
          '0%': { top: '100vh' },
          '100%': { top: '-50vh' },
        },
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        'fade-out': {
          '0%': { opacity: '100%', top: '0' },
          '100%': { opacity: '0%', top: '0' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        disappear: {
          '0%': { opacity: '100%', top: '0' },
          '95%': { opacity: '100%', top: '0' },
          '100%': { opacity: '0%', top: '0' },
        },
        slide: {
          '0%': { transform: 'translateX(100vw)', opacity: '100%' },
          '50%': { transform: 'translateX(0vw)', opacity: '100%' },
          '85%': { opacity: '100%' },
          '100%': {
            transform: 'translateX(0vw) translateY(-100vh)',
            opacity: '0%',
          },
        },
        'cascade-one': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '30%' },
        },
        'cascade-two': {
          '0%': { opacity: '0%' },
          '20%': { opacity: '0%' },
          '100%': { opacity: '50%' },
        },
        'cascade-three': {
          '0%': { opacity: '0%' },
          '40%': { opacity: '0%' },
          '100%': { opacity: '70%' },
        },
        'cascade-four': {
          '0%': { opacity: '0%' },
          '60%': { opacity: '0%' },
          '100%': { opacity: '85%' },
        },
        'cascade-five': {
          '0%': { opacity: '0%' },
          '80%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

/* eslint @typescript-eslint/no-var-requires: "off" */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      'h1-mobile': [
        '3.5rem',
        {
          lineHeight: '4rem',
          letterSpacing: '0',
        },
      ],
      'h2-mobile': [
        '2.5rem',
        {
          lineHeight: '3rem',
          letterSpacing: '0',
        },
      ],
      'h3-mobile': [
        '2rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '0',
        },
      ],
      'h4-mobile': [
        '1.5rem',
        {
          lineHeight: '2rem',
          letterSpacing: '0',
        },
      ],
      'h5-mobile': [
        '1.25rem',
        {
          lineHeight: '2rem',
          letterSpacing: '0',
        },
      ],
      'h1-desktop': [
        '7.5rem',
        {
          lineHeight: '8rem',
          letterSpacing: '0',
        },
      ],
      'h2-desktop': [
        '4rem',
        {
          lineHeight: '4.5rem',
          letterSpacing: '0',
        },
      ],
      'h3-desktop': [
        '3.5rem',
        {
          lineHeight: '4rem',
          letterSpacing: '0',
        },
      ],
      'h4-desktop': [
        '2.5rem',
        {
          lineHeight: '3rem',
          letterSpacing: '0',
        },
      ],
      'h5-desktop': [
        '2rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '0',
        },
      ],
      'h6-desktop': [
        '1.5rem',
        {
          lineHeight: '2rem',
          letterSpacing: '0',
        },
      ],
      'paragraph-medium': [
        '1rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '0',
        },
      ],
      'paragraph-small': [
        '0.875rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '0',
        },
      ],
      'hyperlink-medium': [
        '1rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      'hyperlink-small': [
        '0.875rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
      ],
      caption: [
        '0.875rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '0',
        },
      ],
      tag: [
        '0.75rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.125rem',
          fontWeight: '700',
        },
      ],
      'tag-large': [
        '1rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.125rem',
        },
      ],
      button: [
        '1rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '0.1875rem',
          fontWeight: '700',
        },
      ],
    },
    fontFamily: {
      primary: ['Oxygen', ...defaultTheme.fontFamily.sans],
      secondary: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
    },
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '32px',
      8: '40px',
      9: '48px',
      10: '56px',
      11: '64px',
      12: '72px',
      13: '80px',
      14: '88px',
      15: '96px',
      16: '104px',
      17: '112px',
      18: '120px',
      19: '128px',
      20: '136px',
      21: '144px',
    },
    extend: {
      colors: {
        black: {
          DEFAULT: '#1E1E1E',
          transparent: {
            70: '#1E1E1EB2',
          },
          contrast: {
            DEFAULT: '#FFFFFF',
          },
        },
        feedback: {
          positive: '#038900',
          warning: '#D53F0B',
          negative: '#FF0707',
        },
        gray: {
          DEFAULT: '#9A9187',
          cool: '#C8C9C7',
          0: '#F6F6F6',
          10: '#E7E8E8',
          20: '#D0D1D2',
          40: '#A0A3A4',
          60: '#717477',
          80: '#414649',
          90: '#282F33',
          100: '#DAD0C5',
        },
        green: {
          100: '#E5DECF',
        },
        orange: {
          50: '#FEE5CB',
          100: '#FED4CB',
        },
        pink: {
          100: '#FFD7F3',
        },
        primary: {
          DEFAULT: '#C15D31',
          contrast: '#1E1E1E',
          pressed: '#BF3C00',
          hover: '#CE4100',
        },
        white: {
          bone: '#FBF6F1',
          offWhite: '#FCF6F0',
          DEFAULT: '#FFFFFF',
          transparent: {
            DEFAULT: '#FFFFFF4D',
          },
        },
      },
      boxShadow: {
        'radio-container-checked': '0 0 0 4px #C15D31',
        'radio-container-unchecked': '0 0 0 1px #D0D1D2',
      },
    },
    screens: {
      ...defaultTheme.screens,
      '2xl': '1512px',
      '3xl': '1920px',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
}

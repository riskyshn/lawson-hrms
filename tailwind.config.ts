import type { Config } from 'tailwindcss/types/config'

import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

const tailwindConfig: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/jobseeker-ui/src/components/libs/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  plugins: [typography],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        error: colors.red,
        jsc: {
          primary: '#E4007E',
          secondary: '#20229B',
        },
        primary: colors.blue,
        secondary: colors.gray,
        success: colors.green,
        warning: colors.yellow,
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        position: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionProperty: {
        spacing: 'margin, padding',
      },
    },
  },
}

export default tailwindConfig

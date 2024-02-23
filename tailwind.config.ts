import type { Config } from 'tailwindcss/types/config'

import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const tailwindConfig: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/jobseeker-ui/src/components/libs/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
        jsc: {
          primary: '#E4007E',
          secondary: '#20229B',
        },
      },
    },
  },
  plugins: [],
}

export default tailwindConfig

import type { Config } from 'tailwindcss/types/config'
import typography from '@tailwindcss/typography'
import juiConfig from 'jobseeker-ui/tailwind-config'
import defaultTheme from 'tailwindcss/defaultTheme'

const tailwindConfig: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/jobseeker-ui/dist/index.es.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  plugins: [typography],
  theme: {
    ...juiConfig.theme,
    extend: {
      ...juiConfig.theme?.extend,
      colors: {
        ...juiConfig.theme?.extend?.colors,
        jsc: {
          primary: '#E4007E',
          secondary: '#20229B',
        },
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}

export default tailwindConfig

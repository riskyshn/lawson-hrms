import type { Config } from 'tailwindcss/types/config'
import config from 'jobseeker-ui/tailwind-config'

const tailwindConfig: Config = {
  ...config,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/jobseeker-ui/dist/index.umd.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
}

export default tailwindConfig

import resolveConfig from 'tailwindcss/resolveConfig'

import { createTailwindBreakpointHooks } from 'jobseeker-ui'
import tailwindConfig from '../../tailwind.config'

const config = resolveConfig(tailwindConfig)

export const { useBreakpoint } = createTailwindBreakpointHooks(config.theme.screens)

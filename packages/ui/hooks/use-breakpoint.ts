import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'
import { createTailwindBreakpointHooks } from '../libs'

const config = resolveConfig(tailwindConfig)

export const { useBreakpoint } = createTailwindBreakpointHooks(config.theme.screens)

import { createTailwindBreakpointHooks } from '@jshrms/ui'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const config = resolveConfig(tailwindConfig)

export const { useBreakpoint } = createTailwindBreakpointHooks(config.theme.screens)

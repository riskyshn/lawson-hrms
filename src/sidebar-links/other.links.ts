import { PaletteIcon, SettingsIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const otherLinks = genSidebarLinks({
  title: 'Other',
  items: [
    { parent: { icon: SettingsIcon, text: 'Settings', to: '/settings' } },
    { parent: { icon: PaletteIcon, text: 'Careersite CMS', to: '/cms' } },
  ],
})

export default otherLinks

import { HomeIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const rootLinks = genSidebarLinks({
  items: [{ parent: { icon: HomeIcon, text: 'Dashboard', to: '/' } }],
})

export default rootLinks

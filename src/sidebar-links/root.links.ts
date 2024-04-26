import genSidebarLinks from '@/utils/gen-sidebar-links'
import { HomeIcon } from 'lucide-react'

const rootLinks = genSidebarLinks({
  items: [{ parent: { icon: HomeIcon, text: 'Dashboard', to: '/' } }],
})

export default rootLinks

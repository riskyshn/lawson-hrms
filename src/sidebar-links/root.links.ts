import { HomeIcon } from 'lucide-react'
import { SidebarLinksOptions } from '@/hooks'

const rootLinks: SidebarLinksOptions = {
  items: [{ parent: { icon: HomeIcon, text: 'Dashboard', to: '/' } }],
}

export default rootLinks

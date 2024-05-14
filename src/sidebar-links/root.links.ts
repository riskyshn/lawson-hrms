import { SidebarLinksOptions } from '@jshrms/ui'
import { HomeIcon } from 'lucide-react'

const rootLinks: SidebarLinksOptions = {
  items: [{ parent: { icon: HomeIcon, text: 'Dashboard', to: '/' } }],
}

export default rootLinks

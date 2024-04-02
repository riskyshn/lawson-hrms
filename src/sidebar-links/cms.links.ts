import { PackageIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const cmsLinks = genSidebarLinks({
  items: [{ parent: { icon: PackageIcon, text: 'CMS', to: '/cms' } }],
})

export default cmsLinks

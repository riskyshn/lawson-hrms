import { organizationService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'

interface OrganizationStore {
  company: ICompany | null
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
  refreshCompany: () => Promise<void>
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [company] = await Promise.all([organizationService.fetchCompany()])
    set({ company })
  },

  clean: () => {
    set({ company: null })
  },

  refreshCompany: async () => set({ company: await organizationService.fetchCompany() }),
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('organization.store', useOrganizationStore)
}

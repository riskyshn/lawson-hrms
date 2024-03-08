import { organizationService } from '@/services'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { ICompany } from '@/types/oganizartion'

interface OrganizationStore {
  company?: ICompany | null
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,
  master: null,

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const company = await organizationService.fetchCompany()
    set((state) => ({ ...state, company }))
  },

  clean: () => {
    set({ company: null })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('organization.store', useOrganizationStore)
}

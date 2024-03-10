import { organizationService } from '@/services'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { ICompany, IDepartment } from '@/types/oganizartion'

interface OrganizationStore {
  company: ICompany | null
  master: {
    departments: IDepartment[]
  }
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,
  master: {
    departments: [],
  },

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const company = await organizationService.fetchCompany()
    const departments = await organizationService.fetchDepartments({ size: 99999 })
    set((state) => ({
      ...state,
      company,
      master: {
        ...state.master,
        departments: departments.content,
      },
    }))
  },

  clean: () => {
    set({ company: null })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('organization.store', useOrganizationStore)
}

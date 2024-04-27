import { organizationService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'

interface OrganizationStore {
  company: ICompany | null
  recruitmentStages: IRecruitmentStage[]
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
  refreshCompany: () => Promise<void>
  createRecruitmentStage: (payload: Record<string, any>) => Promise<void>
  updateRecruitmentStage: (oid: string, payload: Record<string, any>) => Promise<void>
  deleteRecruitmentStage: (oid: string) => Promise<void>
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,
  recruitmentStages: [],

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [company, recruitmentStages] = await Promise.all([
      organizationService.fetchCompany(),
      organizationService.fetchRecruitmentStages({ limit: 99999, sortedField: 'createdAt', sortDirection: 'ASC' }),
    ])

    set({
      company,
      recruitmentStages: recruitmentStages.content,
    })
  },

  clean: () => {
    set({
      company: null,
      recruitmentStages: [],
    })
  },

  refreshCompany: async () => set({ company: await organizationService.fetchCompany() }),

  createRecruitmentStage: async (payload) => {
    const data = await organizationService.createRecruitmentStage(payload)
    set((state) => ({
      recruitmentStages: [...state.recruitmentStages, data],
    }))
  },
  updateRecruitmentStage: async (oid, payload) => {
    const data = await organizationService.updateRecruitmentStage(oid, payload)
    set((state) => ({
      recruitmentStages: state.recruitmentStages.map((stage) => (stage.oid === oid ? data : stage)),
    }))
  },
  deleteRecruitmentStage: async (oid) => {
    await organizationService.deleteRecruitmentStage(oid)
    set((state) => ({
      recruitmentStages: state.recruitmentStages.filter((stage) => stage.oid !== oid),
    }))
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('organization.store', useOrganizationStore)
}

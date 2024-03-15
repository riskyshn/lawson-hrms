import { organizationService } from '@/services'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import {
  IBenefit,
  IBranch,
  ICompany,
  IDepartment,
  IJobLevel,
  IJobType,
  IPosition,
  IRecruitmentStage,
  IWorkplacement,
} from '@/types/oganizartion'

interface OrganizationStore {
  company: ICompany | null
  recruitmentStages: IRecruitmentStage[]
  master: {
    departments: IDepartment[]
    branches: IBranch[]
    benefits: IBenefit[]
    jobLevels: IJobLevel[]
    jobTypes: IJobType[]
    positions: IPosition[]
    workplacements: IWorkplacement[]
  }
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
  createRecruitmentStage: (payload: Record<string, any>) => Promise<void>
  updateRecruitmentStage: (oid: string, payload: Record<string, any>) => Promise<void>
  deleteRecruitmentStage: (oid: string) => Promise<void>
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,
  recruitmentStages: [],
  master: {
    departments: [],
    branches: [],
    benefits: [],
    jobLevels: [],
    jobTypes: [],
    positions: [],
    workplacements: [],
  },

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [company, recruitmentStages, departments, branches, benefits, jobLevels, jobTypes, positions, workplacements] = await Promise.all(
      [
        organizationService.fetchCompany(),
        organizationService.fetchRecruitmentStages({ limit: 99999, sortedField: 'createdAt', sortDirection: 'ASC' }),
        organizationService.fetchDepartments({ limit: 99999 }),
        organizationService.fetchBranches({ limit: 99999 }),
        organizationService.fetchBenefits({ limit: 99999 }),
        organizationService.fetchJobLevels({ limit: 99999 }),
        organizationService.fetchJobTypes({ limit: 99999 }),
        organizationService.fetchPositions({ limit: 99999 }),
        organizationService.fetchWorkplacements({ limit: 99999 }),
      ],
    )

    set({
      company,
      recruitmentStages: recruitmentStages.content,
      master: {
        departments: departments.content,
        branches: branches.content,
        benefits: benefits.content,
        jobLevels: jobLevels.content,
        jobTypes: jobTypes.content,
        positions: positions.content,
        workplacements: workplacements.content,
      },
    })
  },

  clean: () => {
    set({
      company: null,
      master: { departments: [], branches: [], benefits: [], jobLevels: [], jobTypes: [], positions: [], workplacements: [] },
    })
  },

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

import { organizationService } from '@/services'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { IBenefit, IBranch, ICompany, IDepartment, IJobLevel, IJobType, IPosition, IWorkplacement } from '@/types/oganizartion'

interface OrganizationStore {
  company: ICompany | null
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
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  company: null,
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
    const [company, departments, branches, benefits, jobLevels, jobTypes, positions, workplacements] = await Promise.all([
      organizationService.fetchCompany(),
      organizationService.fetchDepartments({ size: 99999 }),
      organizationService.fetchBranches({ size: 99999 }),
      organizationService.fetchBenefits({ size: 99999 }),
      organizationService.fetchJobLevels({ size: 99999 }),
      organizationService.fetchJobTypes({ size: 99999 }),
      organizationService.fetchPositions({ size: 99999 }),
      organizationService.fetchWorkplacements({ size: 99999 }),
    ])

    set({
      company,
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
      master: {
        departments: [],
        branches: [],
        benefits: [],
        jobLevels: [],
        jobTypes: [],
        positions: [],
        workplacements: [],
      },
    })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('organization.store', useOrganizationStore)
}

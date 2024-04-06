import { payrollService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'

interface PayrollStore {
  master: {
    pph21: { name: string; category: string }[]
    bpjsComponent: IBPJSComponent | null
  }
  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
}

export const usePayrollStore = create<PayrollStore>((set, get) => ({
  master: {
    pph21: [],
    bpjsComponent: null,
  },

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [pph21, bpjs] = await Promise.all([payrollService.fetchPPH21(), payrollService.fetchBpjsComponent()])

    set({
      master: {
        bpjsComponent: bpjs,
        pph21: pph21.content,
      },
    })
  },

  clean: () => {
    set({
      master: {
        pph21: [],
        bpjsComponent: null,
      },
    })
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('payroll.store', usePayrollStore)
}

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { masterService } from '@/services'

interface MasterStore {
  area: {
    countries: Array<IMasterCountry>
    provinces: Array<IMasterProvince>
    cities: Array<IMasterCity>
    districts: Array<IMasterDistrict>
    subDistricts: Array<IMasterSubDistrict>
  }

  educatioLevels: Array<IMasterEducationLevel>

  init: () => Promise<void>
  refresh: () => Promise<void>
  clean: () => void
  addArea: <K extends keyof MasterStore['area']>(key: K, items: MasterStore['area'][K]) => void
  getArea: <K extends keyof MasterStore['area']>(key: K, oids: string[]) => Promise<Array<MasterStore['area'][K]>>
}

export const useMasterStore = create<MasterStore>((set, get) => ({
  area: {
    countries: [],
    provinces: [],
    cities: [],
    districts: [],
    subDistricts: [],
  },
  educatioLevels: [],

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [educatioLevels] = await Promise.all([masterService.fetchEducationLevel()])

    set({
      educatioLevels: educatioLevels.content,
    })
  },

  clean: () => {
    set({
      area: {
        countries: [],
        provinces: [],
        cities: [],
        districts: [],
        subDistricts: [],
      },
      educatioLevels: [],
    })
  },

  addArea: (key, items) => {
    const data = [...get().area[key], ...items]

    const uniqueData = Array.from(new Set(data.map((item) => item.oid))).map((oid) => {
      return data.find((item) => item.oid === oid)
    })

    set((state) => ({ ...state, area: { ...state.area, [key]: uniqueData } }))
  },

  getArea: async (_key, _oids) => {
    // let data = get().area[key].filter((el) => oids.includes(el.oid))
    // const oidsWithoutData = oids.filter((oid) => !data.some((el) => el.oid === oid))
    // if (oidsWithoutData.length > 0) {
    //   const { content } = await masterService.fetchCitiesByOids(key, oidsWithoutData)
    //   data = [...data, ...content]
    //   get().addArea(key, data as any)
    // }
    // return data as any
    return null as any
  },
}))

if (import.meta.env.DEV) {
  mountStoreDevtool('master.store', useMasterStore)
}

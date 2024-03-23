import { masterService } from '@/services'
import mountStoreDevtool from '@/utils/mount-store-devtool'
import { create } from 'zustand'

interface MasterStore {
  area: {
    countries: Array<IMasterCountry>
    provinces: Array<IMasterProvince>
    cities: Array<IMasterCity>
    districts: Array<IMasterDistrict>
    subDistricts: Array<IMasterSubDistrict>
  }

  educatioLevels: Array<IMasterEducationLevel>
  genders: Array<IMasterGender>
  religions: Array<IMasterReligion>
  maritalStatus: Array<IMasterMaritalStatus>
  fileTypes: Array<IMasterFileType>

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
  genders: [],
  religions: [],
  maritalStatus: [],
  fileTypes: [],

  init: async () => {
    await get().refresh()
  },

  refresh: async () => {
    const [educatioLevels, genders, religions, maritalStatus, fileTypes] = await Promise.all([
      masterService.fetchEducationLevel(),
      masterService.fetchGenders(),
      masterService.fetchReligions(),
      masterService.fetchMaritalStatus(),
      masterService.fetchFileTypes(),
    ])

    set({
      educatioLevels: educatioLevels.content,
      genders: genders.content,
      religions: religions.content,
      maritalStatus: maritalStatus.content,
      fileTypes: fileTypes.content,
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
      genders: [],
      religions: [],
      maritalStatus: [],
      fileTypes: [],
    })
  },

  addArea: (key, items) => {
    const data = [...get().area[key], ...items]

    const uniqueData = Array.from(new Set(data.map((item) => item.oid))).map((oid) => {
      return data.find((item) => item.oid === oid)
    })

    set((state) => ({ ...state, area: { ...state.area, [key]: uniqueData } }))
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

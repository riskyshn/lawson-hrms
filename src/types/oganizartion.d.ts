interface ICoordinate {
  x: number
  y: number
  type: string
  coordinates: [number, number]
}

export interface IAttachBranch {
  oid: string
  name?: string
  address?: string
}

export interface IAttachCompany {
  oid: string
  name?: string
  code?: string
}

export interface IAttachDepartment {
  oid: string
  name?: string
}

export interface IAttachEmployee {
  oid: string
  name?: string
  email?: string
}

export interface ICompany {
  oid: string
  code?: string
  name?: string
  profile?: string
  address?: string
  email?: string
  careersiteUrl?: string
  language?: string
  following?: number
  newsletterSubscribe?: boolean
  status?: boolean
  totalFollowers?: number
  totalBookmark?: number
  totalLike?: number
  latestOnline?: string // date
  loginDate?: string // date
  deletedAt?: string // date
  createdAt?: string // date
  updatedAt?: string // date
  logo?: {
    file?: string
    thumbnail?: string
  }
  video?: {
    file?: string
    thumbnail?: string
  }
  credit?: {
    postingCredit?: number
    offerCredit?: number
    coin?: number
  }
  phoneNumber?: {
    countryCode?: string
    phone?: string
    mobilePhone?: string
    whatsapp?: string
  }
  category?: {
    oid?: string
    name?: Record<string, string>
  }
  industryType?: {
    oid?: string
    name?: Record<string, string>
    img?: string
  }
  city?: {
    oid?: string
    name?: string
  }
  district?: {
    oid?: string
    name?: string
  }
  subDistrict?: {
    oid?: string
    name?: string
  }
  legacyData?: Array<{
    registeredFrom?: string
    flag?: number
    atsFlag?: number
    free?: number
    isFreetrial?: boolean
    isDummy?: boolean
  }>
  notifTokens?: Array<{
    deviceId?: string
    username?: string
    notifTokenMobile?: string
    loginFrom?: string
    createdAt?: string // date
    updatedAt?: string // date
  }>
  sosmed?: Array<{
    oid?: string
    provider?: string
    username?: string
  }>
  gallery?: Array<{
    oid?: string
    order?: number
    file?: string
    thumbnail?: string
    type?: number
    description?: string
    date?: string // date
  }>
  branch?: Array<IAttachBranch>
}

export interface IBranch {
  oid: string
  name?: string
  address?: string
  company?: IAttachCompany
  pic?: IAttachEmployee
  status?: boolean
  coordinate?: ICoordinate | null
  range?: number
  totalEmployee?: number
  totalVacancy?: number
  city?: {
    oid: string
    name?: string
  }
  createdAt?: string // date
  updatedAt?: string // date
}

interface IDepartment {
  oid: string
  name?: string
  code?: string
  company?: IAttachCompany
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

export interface IJobLevel {
  oid: string
  name?: string
  company?: IAttachCompany
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

export interface IPosition {
  oid: string
  name?: string
  company?: IAttachCompany
  department?: AttachDepartment
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

export interface IBenefit {
  oid: string
  name?: string
  company?: IAttachCompany
  status?: boolean
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

export interface IWorkplacement {
  oid: string
  name?: string
}

export interface IJobType {
  oid: string
  name?: string
  totalEmployee?: number
}

export interface IRecruitmentStage {
  oid: string
  type: 'INTERVIEW' | 'ASSESMENT'
  name: string
}

export interface IApproval {
  oid: string
  status: number
  employee: {
    oid: string
    name?: string
  }
  position?: stirng | null
  department?: stirng | null
  branch?: stirng | null
}

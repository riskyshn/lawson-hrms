interface ICompany {
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

  greetingMsg?: string
  nppNumber?: string
  npwpNumber?: string

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
  branch?: Array<{
    oid: string
    name?: string
    address?: string
  }>
}

interface IBranch {
  oid: string
  name?: string
  address?: string
  company?: {
    oid: string
    name?: string
    code?: string
  }
  pic?: {
    oid: string
    name?: string
    email?: string
  }
  status?: boolean
  coordinate?: ICoordinate
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
  company?: {
    oid: string
    name?: string
    code?: string
  }
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IJobLevel {
  oid: string
  name?: string
  company?: {
    oid: string
    name?: string
    code?: string
  }
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IPosition {
  oid: string
  name?: string
  company?: {
    oid: string
    name?: string
    code?: string
  }
  department?: {
    oid: string
    name?: string
  }
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IBenefit {
  oid: string
  name?: string
  company?: {
    oid: string
    name?: string
    code?: string
  }
  status?: boolean
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IWorkplacement {
  oid: string
  name?: string
}

interface IJobType {
  oid: string
  name?: string
  status?: number
  totalEmployee?: number
}

interface IRecruitmentStage {
  oid: string
  type: 'INTERVIEW' | 'ASSESSMENT'
  name: string
}

interface IApproval {
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

interface IDocumentRequest {
  oid: string
  allowedFileTypes: string[]
  name: string
}

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
  city?: IGeneralDataEmmbed
  district?: IGeneralDataEmmbed
  subDistrict?: IGeneralDataEmmbed
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
  branch?: Array<IGeneralDataEmmbed & { address?: string }>
}

interface IBranch {
  oid: string
  name?: string
  address?: string
  company?: IGeneralDataEmmbed & { code?: string }
  pic?: IGeneralDataEmmbed & { email?: string }
  status?: boolean
  coordinate?: ICoordinate
  range?: number
  totalEmployee?: number
  totalVacancy?: number
  city?: IGeneralDataEmmbed
  createdAt?: string // date
  updatedAt?: string // date
}

interface IDepartment {
  oid: string
  name?: string
  code?: string
  company?: IGeneralDataEmmbed & { code?: string }
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IJobLevel {
  oid: string
  name?: string
  company?: IGeneralDataEmmbed & { code?: string }
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IPosition {
  oid: string
  name?: string
  company?: IGeneralDataEmmbed & { code?: string }
  department?: IGeneralDataEmmbed
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IBenefit {
  oid: string
  name?: string
  company?: IGeneralDataEmmbed & { code?: string }
  status?: boolean
  totalVacancy?: number
  createdAt?: string
  updatedAt?: string
}

interface IWorkplacement {
  oid: string
  name?: string
  createdAt?: string
  updatedAt?: string
}

interface IJobType {
  oid: string
  name?: string
  status?: number
  totalEmployee?: number
  createdAt?: string
  updatedAt?: string
}

interface IRecruitmentStage {
  oid: string
  type: 'INTERVIEW' | 'ASSESSMENT'
  name: string
}

interface IApproval {
  oid: string
  status: number
  employee: IGeneralDataEmmbed
  position?: stirng | null
  department?: stirng | null
  branch?: stirng | null
}

interface IDocumentRequest {
  oid: string
  allowedFileTypes: string[]
  name: string
  createdAt?: string
  updatedAt?: string
}

interface IOfferingLetterSetting {
  offeringLetterId: string
  letterHead?: string
  greetings?: string
  body?: string
  additionalInformation?: string
  signeeRole?: string
  signeeName?: string
  signature?: string
}

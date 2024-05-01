interface ICompany {
  address?: string
  branch?: Array<{ address?: string } & IGeneralDataEmmbed>
  careersiteUrl?: string
  category?: {
    name?: Record<string, string>
    oid?: string
  }
  city?: IGeneralDataEmmbed
  code?: string
  createdAt?: string // date
  credit?: {
    coin?: number
    offerCredit?: number
    postingCredit?: number
  }
  deletedAt?: string // date
  district?: IGeneralDataEmmbed
  email?: string
  following?: number
  gallery?: Array<{
    date?: string // date
    description?: string
    file?: string
    oid?: string
    order?: number
    thumbnail?: string
    type?: number
  }>
  greetingMsg?: string

  industryType?: {
    img?: string
    name?: Record<string, string>
    oid?: string
  }
  language?: string
  latestOnline?: string // date

  legacyData?: Array<{
    atsFlag?: number
    flag?: number
    free?: number
    isDummy?: boolean
    isFreetrial?: boolean
    registeredFrom?: string
  }>
  loginDate?: string // date
  logo?: {
    file?: string
    thumbnail?: string
  }
  name?: string
  newsletterSubscribe?: boolean
  notifTokens?: Array<{
    createdAt?: string // date
    deviceId?: string
    loginFrom?: string
    notifTokenMobile?: string
    updatedAt?: string // date
    username?: string
  }>
  nppNumber?: string
  npwpNumber?: string
  oid: string
  phoneNumber?: {
    countryCode?: string
    mobilePhone?: string
    phone?: string
    whatsapp?: string
  }
  profile?: string
  sosmed?: Array<{
    oid?: string
    provider?: string
    username?: string
  }>
  status?: boolean
  subDistrict?: IGeneralDataEmmbed
  totalBookmark?: number
  totalFollowers?: number
  totalLike?: number
  updatedAt?: string // date
  video?: {
    file?: string
    thumbnail?: string
  }
}

interface IBranch {
  address?: string
  city?: IGeneralDataEmmbed
  company?: { code?: string } & IGeneralDataEmmbed
  coordinate?: ICoordinate
  createdAt?: string // date
  name?: string
  oid: string
  pic?: { email?: string } & IGeneralDataEmmbed
  range?: number
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  updatedAt?: string // date
}

interface IDepartment {
  code?: string
  company?: { code?: string } & IGeneralDataEmmbed
  createdAt?: string
  name?: string
  oid: string
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  updatedAt?: string
}

interface IJobLevel {
  company?: { code?: string } & IGeneralDataEmmbed
  createdAt?: string
  name?: string
  oid: string
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  updatedAt?: string
}

interface IPosition {
  company?: { code?: string } & IGeneralDataEmmbed
  createdAt?: string
  department?: IGeneralDataEmmbed
  name?: string
  oid: string
  status?: boolean
  totalEmployee?: number
  totalVacancy?: number
  updatedAt?: string
}

interface IBenefit {
  company?: { code?: string } & IGeneralDataEmmbed
  createdAt?: string
  name?: string
  oid: string
  status?: boolean
  totalVacancy?: number
  updatedAt?: string
}

interface IWorkplacement {
  createdAt?: string
  name?: string
  oid: string
  updatedAt?: string
}

interface IJobType {
  createdAt?: string
  name?: string
  oid: string
  status?: number
  totalEmployee?: number
  updatedAt?: string
}

interface IRecruitmentStage {
  name: string
  oid: string
  type: 'ASSESSMENT' | 'INTERVIEW'
}

interface IApproval {
  branch?: null | stirng
  department?: null | stirng
  employee: IGeneralDataEmmbed
  oid: string
  position?: null | stirng
  status: number
}

interface IDocumentRequest {
  allowedFileTypes: string[]
  createdAt?: string
  name: string
  oid: string
  updatedAt?: string
}

interface IOfferingLetterSetting {
  additionalInformation?: string
  body?: string
  greetings?: string
  letterHead?: string
  offeringLetterId: string
  signature?: string
  signeeName?: string
  signeeRole?: string
}

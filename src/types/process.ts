import { IGeneralDataEmmbed } from './shared'

export interface IDataTableApplicant {
  actionAt?: string
  candidate?: { email?: string } & IGeneralDataEmmbed
  createdAt?: string
  documentLink?: string
  photoProfile?: string
  oid: string

  recruitmentStage?: string

  status?: {
    name?: string
    oid: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
  }
  vacancy?: { rrNumber?: string } & IGeneralDataEmmbed
}

export interface IApplicant extends IDataTableApplicant {
  histories?: Array<{
    actionAt?: string
    applyProcess?: string
    file?: string
    from?: string
    notes?: string
    oid: string
    processAt?: string
    status?: string
    attendees?: Array<IGeneralDataEmmbed>
  }>
}

export interface IApplicantStage {
  isAvailable: boolean
  name: string
  oid: string
  type: 'ASSESSMENT' | 'INTERVIEW'
}

export interface IUploadedProcessDocument {
  document: IGeneralDataEmmbed
  file: {
    link: string
    type?: string
  }
  uploadedAt: string
}

export interface IOfferingLetter {
  baseSalary?: number
  benefits?: Array<{ amount?: number; name?: string }>
  city?: IGeneralDataEmmbed
  department?: IGeneralDataEmmbed
  expiryDate?: string
  jobLevel?: IGeneralDataEmmbed
  jobType?: IGeneralDataEmmbed
  joinDate?: string
  letterNumber: string
  position?: IGeneralDataEmmbed
}

export interface IProcessSchedule {
  schedule?: {
    interviewId?: string
    name?: string
    description?: string
    location?: string
    startedAt?: string
    endedAt?: string
    timezone?: string
    guests?: Array<string>
    meet?: boolean
    linkGmeet?: string
  }
}

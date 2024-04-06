interface IDataTableApplicant {
  oid: string
  recruitmentStage?: string
  actionAt?: string
  createdAt?: string
  documentLink?: string

  status?: {
    oid: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
    name?: string
  }

  candidate?: IGeneralDataEmmbed & { email?: string }
  vacancy?: IGeneralDataEmmbed & { rrNumber?: string }
}

interface IApplicant extends IDataTableApplicant {
  histories?: Array<{
    oid: string
    applyProcess?: string
    status?: string
    from?: string
    notes?: string
    file?: string
    actionAt?: string
    processAt?: string
  }>
}

interface IApplicantStage {
  oid: string
  name: string
  type: 'INTERVIEW' | 'ASSESSMENT'
  isAvailable: boolean
}

interface IUploadedProcessDocument {
  document: IGeneralDataEmmbed
  file: {
    link: string
    type?: string
  }
  uploadedAt: string
}

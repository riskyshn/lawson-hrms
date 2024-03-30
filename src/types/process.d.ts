interface IDataTableApplicant {
  oid: string
  recruitmentStage?: string
  actionAt?: string | null
  createdAt?: string

  status?: {
    oid: '0' | '1' | '2'
    name?: string
  }

  candidate?: {
    oid: string
    name?: string
    email?: string
  }

  vacancy?: {
    oid: string
    rrNumber?: string
    name?: string
  }
}

interface IApplicant extends IDataTableApplicant {
  histories?: Array<{
    oid: string
    applyProcess?: string
    status?: string
    from?: string
    notes?: string | null
    file?: string | null
    actionAt?: string | null
    processAt?: string
  }>
}

interface IApplicantStage {
  oid: string
  name: string
  type: 'INTERVIEW' | 'ASSESMENT'
  isAvailable: boolean
}

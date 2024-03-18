import { useOrganizationStore } from '@/store'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'

const PreviewRecruitmentStageCard: React.FC<{ process: Exclude<IVacancy['recruitmentProcess'], undefined> }> = ({ process }) => {
  const { recruitmentStages } = useOrganizationStore()

  const stages = process.map((el) => el.id)
  const interviews = recruitmentStages.filter((el) => el.type == 'INTERVIEW').filter((el) => stages.includes(el.oid))
  const assesments = recruitmentStages.filter((el) => el.type == 'ASSESMENT').filter((el) => stages.includes(el.oid))

  const items = [
    { text: 'Candidate Apply' },
    { text: 'Interview', items: interviews },
    { text: 'Assessment', items: assesments },
    { text: 'Offering Letter' },
    { text: 'Onboarding' },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Recruitment Process</h3>
      </CardHeader>
      <CardBody className="p-3 pl-6">
        <ol className="border-l border-dashed">
          {items.map((el, i) => (
            <li key={i} className="relative mb-5 pl-6 last:mb-0">
              <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
              <h3 className="flex items-center gap-3 font-semibold">{el.text}</h3>
              {el.items && (
                <div className="flex flex-col gap-3 py-3">
                  {el.items.map((el, i2) => (
                    <div key={i2}>{el.name}</div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  )
}

export default PreviewRecruitmentStageCard

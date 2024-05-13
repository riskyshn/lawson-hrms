import type { ICandidate, IUploadedProcessDocument } from '@/types'
import React from 'react'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import numberToCurrency from '@/utils/number-to-currency'

const CandidateDetailCard: React.FC<{ documents?: IUploadedProcessDocument[]; flag?: string; items?: ICandidate; title?: string }> = ({
  documents,
  flag,
  items,
  title,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

  return (
    <Card className="h-full overflow-hidden">
      {flag !== 'resume' && flag !== 'document' ? (
        <>
          <CardHeader>
            <h3 className="text-lg font-semibold">{title}</h3>
          </CardHeader>
          <CardBody className="p-0">
            <table className="table w-full text-sm">
              <tbody>
                {flag === 'candidate-information' && (
                  <>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Expected Salary</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.expectedSalary ? numberToCurrency(parseFloat(items?.expectedSalary)) : '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Full Name</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.name || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">NIK</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.nik || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Email</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.email || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Phone Number</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.phone || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Date of Birth</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.birthdate || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Gender</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.gender || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Province</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.province || '-'}</td>
                    </tr>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">City</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.city || '-'}</td>
                    </tr>
                  </>
                )}
                {flag === 'education' && (
                  <>
                    <tr className="odd:bg-gray-50">
                      <th className="whitespace-nowrap p-3 text-left">Last Education</th>
                      <td className="p-3">:</td>
                      <td className="w-full p-3">{items?.lastEducation || '-'}</td>
                    </tr>
                    {items?.educations?.map((education, index) => (
                      <React.Fragment key={index}>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Institution Name</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{education.institution || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Major</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{education.major || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">GPA/Final Score</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{education.gpa || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Start Date</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{formatDate(education.startDate) || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">End Date</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{formatDate(education.graduateDate) || '-'}</td>
                        </tr>
                        {items?.educations && items?.educations.length > 1 && index !== items?.educations.length - 1 && (
                          <tr className="h-10 odd:bg-gray-50">
                            <th className="whitespace-nowrap p-3 text-left"></th>
                            <td className="p-3"></td>
                            <td className="w-full p-3"></td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
                {flag === 'experience' && (
                  <>
                    {items?.experiences?.map((experience, index) => (
                      <React.Fragment key={index}>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Company Name</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{experience.companyName || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Position</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{experience.position || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">Start Date</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{formatDate(experience.startDate) || '-'}</td>
                        </tr>
                        <tr className="odd:bg-gray-50">
                          <th className="whitespace-nowrap p-3 text-left">End Date</th>
                          <td className="p-3">:</td>
                          <td className="w-full p-3">{formatDate(experience.endDate) || '-'}</td>
                        </tr>
                        {items?.experiences && items?.experiences.length > 1 && index !== items?.experiences.length - 1 && (
                          <tr className="h-10 odd:bg-gray-50">
                            <th className="whitespace-nowrap p-3 text-left"></th>
                            <td className="p-3"></td>
                            <td className="w-full p-3"></td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </>
      ) : flag === 'resume' ? (
        <>
          <CardHeader>
            <h3 className="text-lg font-semibold">{'Resume/CV'}</h3>
          </CardHeader>
          <CardBody className="h-96 p-5">
            {items?.cv ? (
              <iframe className="block h-full w-full rounded-lg bg-white" src={items.cv} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">No data found</p>
              </div>
            )}
          </CardBody>
          <CardHeader>
            <h3 className="text-lg font-semibold">{'Video'}</h3>
          </CardHeader>
          <CardBody className="relative flex h-96 items-center justify-center p-5">
            {items?.videoResume ? (
              <video className="h-full rounded-lg bg-black" controls loop src={items.videoResume} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500">No video found</p>
              </div>
            )}
          </CardBody>
        </>
      ) : flag === 'document' ? (
        <>
          {documents?.map((doc, index) => (
            <div key={index}>
              <CardHeader>
                <h3 className="text-lg font-semibold">{doc.document.name}</h3>
              </CardHeader>
              <CardBody className="flex h-full items-center justify-center p-5">
                {doc.file.link ? (
                  doc.file.link.endsWith('.pdf') ? (
                    <iframe
                      allowFullScreen
                      className="block h-full w-full rounded-lg bg-white"
                      src={doc.file.link}
                      style={{ background: '#000', border: 'none', display: 'block', height: '100vh', width: '100vw' }}
                      title={`Document-${index}`}
                    />
                  ) : (
                    <img alt={`Document-${index}`} className="block h-full w-full rounded-lg" src={doc.file.link} />
                  )
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">No data found.</p>
                  </div>
                )}
              </CardBody>
            </div>
          ))}
        </>
      ) : null}
    </Card>
  )
}

export default CandidateDetailCard

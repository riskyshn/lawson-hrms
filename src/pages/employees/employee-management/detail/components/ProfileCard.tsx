import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Avatar, Button, Card, CardBody } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, User2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import ButtonDeleteEmployee from './ButtonDeleteEmployee'

type PropType = {
  employee?: IEmployee
  children?: React.ReactNode
}

const ProfileCard: React.FC<PropType> = ({ employee, children }) => {
  const md = useBreakpoint('md')

  if (!employee) return null

  return (
    <Card>
      <CardBody className="flex gap-3">
        <div className="flex">
          <Avatar name={employee.name || ''} size={md ? 128 : 64} className="flex bg-primary-100 text-2xl text-primary-700" />
        </div>
        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          <div className="flex-1">
            <span className="mb-2 block text-lg font-semibold lg:text-2xl">{employee.name}</span>
            <div className="flex flex-col lg:gap-3">
              <div className="flex items-center gap-2">
                <User2Icon className="text-gray-400" size={14} />
                <span className="block text-sm">{employee.employeeCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinnedIcon className="text-gray-400" size={14} />
                <p className="block text-sm">{employee.employment?.branch?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="text-gray-400" size={14} />
                <a className="block text-sm hover:text-primary-600" target="_blank" href={`mailto:${employee.email}`}>
                  {employee.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button as={Link} to={`/employees/employee-management/${employee.oid}/edit`} variant="light" className="px-5" color="primary">
              Edit
            </Button>
            <ButtonDeleteEmployee oid={employee.oid} color="error" />
          </div>
        </div>
      </CardBody>
      {children}
    </Card>
  )
}

export default ProfileCard

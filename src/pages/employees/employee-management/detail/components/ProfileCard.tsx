import type { IEmployee } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Card, CardBody } from '@jshrms/ui'
import { MailIcon, MapPinnedIcon, User2Icon } from 'lucide-react'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import ButtonDeleteEmployee from './ButtonDeleteEmployee'

type PropType = {
  children?: React.ReactNode
  employee?: IEmployee
}

const ProfileCard: React.FC<PropType> = ({ children, employee }) => {
  const md = useBreakpoint('md')

  if (!employee) return null

  return (
    <Card>
      <CardBody className="flex gap-3">
        <div className="flex">
          <Avatar className="flex bg-primary-100 text-2xl text-primary-700" name={employee.name || ''} size={md ? 128 : 64} />
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
                <a className="block text-sm hover:text-primary-600" href={`mailto:${employee.email}`} target="_blank" rel="noreferrer">
                  {employee.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button as={Link} className="px-5" color="primary" to={`/employees/employee-management/${employee.oid}/edit`} variant="light">
              Edit
            </Button>
            <ButtonDeleteEmployee color="error" oid={employee.oid} />
          </div>
        </div>
      </CardBody>
      {children}
    </Card>
  )
}

export default ProfileCard

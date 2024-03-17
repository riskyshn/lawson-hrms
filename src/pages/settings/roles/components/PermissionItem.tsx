import { Card, CardBody, CardHeader, Skeleton, Switch } from 'jobseeker-ui'
import React from 'react'

type PropType = {
  groupName: string
  permissions: IPermission[]
  value: string[]
  setValue: (value: string[]) => void
}

const PermissionItem: React.FC<PropType> = ({ groupName, permissions, value, setValue }) => {
  const handleCheck = (checked: boolean, oid: string) => {
    if (checked) {
      setValue([...new Set([...value, oid])])
    } else {
      setValue(value.filter((id) => id !== oid))
    }
  }

  return (
    <Card>
      <CardHeader className="font-semibold">{groupName}</CardHeader>
      <CardBody className="flex flex-col p-0">
        {permissions?.map((el) => (
          <div key={el.oid} className="flex items-center justify-between p-3 odd:bg-gray-50">
            <span className="block text-sm font-semibold">{el.name}</span>
            <Switch color="primary" checked={value.includes(el.oid)} onChange={(value) => handleCheck(value, el.oid)} />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export const PermissionItemSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-1/2" />
    </CardHeader>
    <CardBody className="p-0">
      {Array.from(Array(5)).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 odd:bg-gray-50">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-6 w-10 rounded-full" />
        </div>
      ))}
    </CardBody>
  </Card>
)

export default PermissionItem

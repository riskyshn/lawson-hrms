import React from 'react'
import { Card, CardBody, CardHeader, Skeleton, Switch } from 'jobseeker-ui'

type PropType = {
  groupName: string
  permissions: IPermission[]
  setValue: (value: string[]) => void
  value: string[]
}

const PermissionItem: React.FC<PropType> = ({ groupName, permissions, setValue, value }) => {
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
          <div className="flex items-center justify-between p-3 odd:bg-gray-50" key={el.oid}>
            <span className="block text-sm font-semibold">{el.name}</span>
            <Switch checked={value.includes(el.oid)} color="primary" onChange={(value) => handleCheck(value, el.oid)} />
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
        <div className="flex items-center justify-between p-3 odd:bg-gray-50" key={i}>
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-6 w-10 rounded-full" />
        </div>
      ))}
    </CardBody>
  </Card>
)

export default PermissionItem

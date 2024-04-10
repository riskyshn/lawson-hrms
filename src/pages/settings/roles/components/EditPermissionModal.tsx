import MainModal from '@/components/Elements/Modals/MainModal'
import { authorityService } from '@/services'
import { Button, useToast } from 'jobseeker-ui'
import React, { useEffect, useMemo, useState } from 'react'
import PermissionItem, { PermissionItemSkeleton } from './PermissionItem'
import { axiosErrorMessage } from '@/utils/axios'

type EditPermissionModalProps = {
  role?: IRole | null
  onClose?: () => void
  onUpdated?: (role: IRole) => void
}

const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ role: newRole, onClose, onUpdated }) => {
  const [role, setRole] = useState<IRole | null>(null)
  const [permissions, setPermissions] = useState<IPermission[]>([])
  const [isLoadPermissionsLoading, setIsLoadPermissionsLoading] = useState<boolean>(true)
  const [modalError, setModalError] = useState<any>(null)
  const [value, setValue] = useState<string[]>([])
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)

  const toast = useToast()

  useEffect(() => {
    if (newRole) {
      setRole(newRole)
      setValue(newRole.attachedPolicies?.map((el) => el.oid) || [])
    }
  }, [newRole])

  useEffect(() => {
    const fetchPermissions = async () => {
      setIsLoadPermissionsLoading(true)
      try {
        const permissionsResponse = await authorityService.fetchPermissions({ limit: 999999 })
        setPermissions(permissionsResponse.content)
      } catch (error) {
        setModalError(error)
      } finally {
        setIsLoadPermissionsLoading(false)
      }
    }

    if (newRole && permissions.length === 0) fetchPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRole])

  const handleSubmit = async () => {
    if (!role) return
    setIsSubmitLoading(true)
    try {
      const updatedRole = await authorityService.updateRole(role.oid, {
        name: role.name,
        code: role.code,
        description: role.description,
        attachedPermissions: value,
      })
      toast(`Role "${updatedRole.name}" permissions updated successfully.`, { color: 'success' })
      onClose?.()
      onUpdated?.(updatedRole)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setIsSubmitLoading(false)
  }

  const groupedPermissionsByGroupName = useMemo(() => {
    const groupedPermissions: { [groupName: string]: IPermission[] } = {}
    permissions.forEach((permission) => {
      if (!groupedPermissions[permission.groupName]) {
        groupedPermissions[permission.groupName] = []
      }
      groupedPermissions[permission.groupName].push(permission)
    })
    return groupedPermissions
  }, [permissions])

  if (modalError) throw modalError

  return (
    <MainModal className="max-w-xl" show={!!newRole}>
      <h3 className="text-xl font-semibold">Access Managemet</h3>
      <p className="mb-3 text-xs">
        Edit Access Managemet For Role <span className="text-primary-600">{role?.name}</span>
      </p>

      <div className="flex flex-col gap-3">
        {isLoadPermissionsLoading && Array.from(Array(3)).map((_, i) => <PermissionItemSkeleton key={i} />)}

        {!isLoadPermissionsLoading &&
          Object.keys(groupedPermissionsByGroupName).map((groupName) => (
            <PermissionItem
              key={groupName}
              groupName={groupName}
              permissions={groupedPermissionsByGroupName[groupName]}
              value={value}
              setValue={setValue}
            />
          ))}
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <Button type="button" color="error" variant="light" className="w-24" disabled={isSubmitLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" color="primary" className="w-24" disabled={isSubmitLoading} loading={isSubmitLoading} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </MainModal>
  )
}

export default EditPermissionModal

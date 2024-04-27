import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { attendanceService, authorityService, employeeService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  employeeCode: yup.string().required().label('Employee ID'),
  role: YUP_OPTION_OBJECT.required().label('Role'),
  jobType: YUP_OPTION_OBJECT.required().label('Employment Status'),
  branch: YUP_OPTION_OBJECT.required().label('Branch Placement'),
  department: YUP_OPTION_OBJECT.required().label('Department'),
  position: YUP_OPTION_OBJECT.required().label('Position'),
  jobLevel: YUP_OPTION_OBJECT.required().label('Job Level'),
  picApproval: YUP_OPTION_OBJECT.required().label('PIC for Approval'),
  schedule: YUP_OPTION_OBJECT.required().label('Schedule'),
})

const EmploymentDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Employment Data</h3>
          <p className="text-xs text-gray-500">Fill all employee data information related to company</p>
        </div>

        <Input label="Employee ID" labelRequired placeholder="JSC-001" error={errors.employeeCode?.message} {...register('employeeCode')} />
        <AsyncSelect
          label="Role"
          placeholder="Role"
          labelRequired
          action={authorityService.fetchRoles}
          converter={emmbedToOptions}
          name="role"
          error={errors.role?.message}
          value={getValues('role')}
          onValueChange={(v) => {
            setValue('role', v)
            trigger('role')
          }}
        />
        <AsyncSelect
          label="Employment Status"
          placeholder="Employment Status"
          labelRequired
          action={organizationService.fetchJobTypes}
          converter={emmbedToOptions}
          name="jobType"
          error={errors.jobType?.message}
          value={getValues('jobType')}
          onValueChange={(v) => {
            setValue('jobType', v)
            trigger('jobType')
          }}
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Branch Placement"
            placeholder="Branch Placement"
            labelRequired
            action={organizationService.fetchBranches}
            converter={emmbedToOptions}
            name="branch"
            error={errors.branch?.message}
            value={getValues('branch')}
            onValueChange={(v) => {
              setValue('branch', v)
              trigger('branch')
            }}
          />
          <AsyncSelect
            label="Department"
            placeholder="Department"
            labelRequired
            action={organizationService.fetchDepartments}
            converter={emmbedToOptions}
            name="department"
            error={errors.department?.message}
            value={getValues('department')}
            onValueChange={(v) => {
              setValue('department', v)
              trigger('department')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Position"
            placeholder="Position"
            labelRequired
            action={organizationService.fetchPositions}
            converter={emmbedToOptions}
            name="position"
            error={errors.position?.message}
            value={getValues('position')}
            onValueChange={(v) => {
              setValue('position', v)
              trigger('position')
            }}
          />
          <AsyncSelect
            label="Job Level"
            placeholder="Job Level"
            labelRequired
            action={organizationService.fetchJobLevels}
            converter={emmbedToOptions}
            name="jobLevel"
            error={errors.jobLevel?.message}
            value={getValues('jobLevel')}
            onValueChange={(v) => {
              setValue('jobLevel', v)
              trigger('jobLevel')
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="PIC for Approval"
            labelRequired
            placeholder="PIC for Approval"
            action={employeeService.fetchEmployees}
            converter={emmbedToOptions}
            name="picApproval"
            error={errors.picApproval?.message}
            value={getValues('picApproval')}
            onValueChange={(v) => {
              setValue('picApproval', v)
              trigger('picApproval')
            }}
          />
          <AsyncSelect
            label="Schedule"
            placeholder="Schedule"
            labelRequired
            action={attendanceService.fetchSchedules}
            converter={emmbedToOptions}
            name="schedule"
            error={errors.schedule?.message}
            value={getValues('schedule')}
            onValueChange={(v) => {
              setValue('schedule', v)
              trigger('schedule')
            }}
          />
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" color="primary" variant="light" className="w-32" onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="button" color="primary" className="w-32" onClick={onSubmit}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EmploymentDataForm

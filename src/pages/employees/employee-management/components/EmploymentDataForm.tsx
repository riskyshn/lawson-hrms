import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { attendanceService, authorityService, employeeService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  branch: YUP_OPTION_OBJECT.required().label('Branch Placement'),
  department: YUP_OPTION_OBJECT.required().label('Department'),
  employeeCode: yup.string().required().label('Employee ID'),
  jobLevel: YUP_OPTION_OBJECT.required().label('Job Level'),
  jobType: YUP_OPTION_OBJECT.required().label('Employment Status'),
  picApproval: YUP_OPTION_OBJECT.required().label('PIC for Approval'),
  position: YUP_OPTION_OBJECT.required().label('Position'),
  role: YUP_OPTION_OBJECT.required().label('Role'),
  schedule: YUP_OPTION_OBJECT.required().label('Schedule'),
})

const EmploymentDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm({
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Employment Data</h3>
          <p className="text-xs text-gray-500">Fill all employee data information related to company</p>
        </div>

        <Input error={errors.employeeCode?.message} label="Employee ID" labelRequired placeholder="JSC-001" {...register('employeeCode')} />
        <AsyncSelect
          action={authorityService.fetchRoles}
          converter={emmbedToOptions}
          error={errors.role?.message}
          label="Role"
          labelRequired
          name="role"
          onValueChange={(v) => {
            setValue('role', v)
            trigger('role')
          }}
          placeholder="Role"
          value={getValues('role')}
        />
        <AsyncSelect
          action={organizationService.fetchJobTypes}
          converter={emmbedToOptions}
          error={errors.jobType?.message}
          label="Employment Status"
          labelRequired
          name="jobType"
          onValueChange={(v) => {
            setValue('jobType', v)
            trigger('jobType')
          }}
          placeholder="Employment Status"
          value={getValues('jobType')}
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={organizationService.fetchBranches}
            converter={emmbedToOptions}
            error={errors.branch?.message}
            label="Branch Placement"
            labelRequired
            name="branch"
            onValueChange={(v) => {
              setValue('branch', v)
              trigger('branch')
            }}
            placeholder="Branch Placement"
            value={getValues('branch')}
          />
          <AsyncSelect
            action={organizationService.fetchDepartments}
            converter={emmbedToOptions}
            error={errors.department?.message}
            label="Department"
            labelRequired
            name="department"
            onValueChange={(v) => {
              setValue('department', v)
              trigger('department')
            }}
            placeholder="Department"
            value={getValues('department')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={organizationService.fetchPositions}
            converter={emmbedToOptions}
            error={errors.position?.message}
            label="Position"
            labelRequired
            name="position"
            onValueChange={(v) => {
              setValue('position', v)
              trigger('position')
            }}
            placeholder="Position"
            value={getValues('position')}
          />
          <AsyncSelect
            action={organizationService.fetchJobLevels}
            converter={emmbedToOptions}
            error={errors.jobLevel?.message}
            label="Job Level"
            labelRequired
            name="jobLevel"
            onValueChange={(v) => {
              setValue('jobLevel', v)
              trigger('jobLevel')
            }}
            placeholder="Job Level"
            value={getValues('jobLevel')}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={employeeService.fetchEmployees}
            converter={emmbedToOptions}
            error={errors.picApproval?.message}
            label="PIC for Approval"
            labelRequired
            name="picApproval"
            onValueChange={(v) => {
              setValue('picApproval', v)
              trigger('picApproval')
            }}
            placeholder="PIC for Approval"
            value={getValues('picApproval')}
          />
          <AsyncSelect
            action={attendanceService.fetchSchedules}
            converter={emmbedToOptions}
            error={errors.schedule?.message}
            label="Schedule"
            labelRequired
            name="schedule"
            onValueChange={(v) => {
              setValue('schedule', v)
              trigger('schedule')
            }}
            placeholder="Schedule"
            value={getValues('schedule')}
          />
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
          Prev
        </Button>
        <Button className="w-32" color="primary" onClick={onSubmit} type="button">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EmploymentDataForm

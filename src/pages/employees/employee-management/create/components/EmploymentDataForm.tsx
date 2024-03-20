import AsyncSelect from '@/components/Elements/AsyncSelect'
import { attendanceService, authorityService, employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  employeeId: yup.string().required().label('Employee ID'),
  roleId: yup.string().required().label('Role'),
  jobTypeId: yup.string().required().label('Employment Status'),
  branchId: yup.string().required().label('Branch Placement'),
  departmentId: yup.string().required().label('Department'),
  positionId: yup.string().required().label('Position'),
  jobLevelId: yup.string().required().label('Job Level'),
  picApprovalId: yup.string().required().label('PIC for Approval'),
  scheduleId: yup.string().required().label('Schedule'),
})

const EmploymentDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    master: { jobTypes, jobLevels, branches, departments, positions },
  } = useOrganizationStore()

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

        <Input label="Employee ID" labelRequired placeholder="JSC-001" error={errors.employeeId?.message} {...register('employeeId')} />
        <AsyncSelect
          label="Role"
          labelRequired
          placeholder="Role"
          fetcher={authorityService.fetchRoles}
          fetcherParams={{ limit: '99999' }}
          searchMinCharacter={0}
          converter={(data: any) => data.map((el: IRole) => ({ label: el.name, value: el.oid }))}
          name="roleId"
          error={errors.roleId?.message}
          value={getValues('roleId')}
          onChange={(v) => {
            setValue('roleId', v.toString())
            trigger('roleId')
          }}
        />
        <Select
          label="Employment Status"
          placeholder="Employment Status"
          labelRequired
          options={jobTypes.map((el) => ({ label: `${el.name}`, value: el.oid }))}
          hideSearch
          name="jobTypeId"
          error={errors.jobTypeId?.message}
          value={getValues('jobTypeId')}
          onChange={(v) => {
            setValue('jobTypeId', v.toString())
            trigger('jobTypeId')
          }}
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Branch Placement"
            placeholder="Branch Placement"
            labelRequired
            options={branches.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            hideSearch
            name="branchId"
            error={errors.branchId?.message}
            value={getValues('branchId')}
            onChange={(v) => {
              setValue('branchId', v.toString())
              trigger('branchId')
            }}
          />
          <Select
            label="Department"
            placeholder="Department"
            labelRequired
            options={departments.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            hideSearch
            name="departmentId"
            error={errors.departmentId?.message}
            value={getValues('departmentId')}
            onChange={(v) => {
              setValue('departmentId', v.toString())
              trigger('departmentId')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Position"
            placeholder="Position"
            labelRequired
            options={positions.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            hideSearch
            name="positionId"
            error={errors.positionId?.message}
            value={getValues('positionId')}
            onChange={(v) => {
              setValue('positionId', v.toString())
              trigger('positionId')
            }}
          />
          <Select
            label="Job Level"
            placeholder="Job Level"
            labelRequired
            options={jobLevels.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            hideSearch
            name="jobLevelId"
            error={errors.jobLevelId?.message}
            value={getValues('jobLevelId')}
            onChange={(v) => {
              setValue('jobLevelId', v.toString())
              trigger('jobLevelId')
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="PIC for Approval"
            labelRequired
            placeholder="PIC for Approval"
            fetcher={employeeService.fetchEmployees}
            fetcherParams={{ limit: '99999' }}
            searchMinCharacter={0}
            converter={(data: any) => data.map((el: IEmployee) => ({ label: el.name, value: el.oid }))}
            name="picApprovalId"
            error={errors.picApprovalId?.message}
            value={getValues('picApprovalId')}
            onChange={(v) => {
              setValue('picApprovalId', v.toString())
              trigger('picApprovalId')
            }}
          />
          <AsyncSelect
            label="Schedule"
            placeholder="Schedule"
            labelRequired
            fetcher={attendanceService.fetchSchedules}
            fetcherParams={{ limit: '99999' }}
            searchMinCharacter={0}
            converter={(data: any) => data.map((el: ISchedule) => ({ label: el.title, value: el.id }))}
            name="scheduleId"
            error={errors.scheduleId?.message}
            value={getValues('scheduleId')}
            onChange={(v) => {
              setValue('scheduleId', v.toString())
              trigger('scheduleId')
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

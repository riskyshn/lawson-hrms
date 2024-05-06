import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, Spinner } from 'jobseeker-ui'
import useAsyncAction from '@/core/hooks/use-async-action'
import { payrollService } from '@/services'
import numberToCurrency from '@/utils/number-to-currency'
import ComponentItem from './ComponentItem'
import { componentDataSchema, defaultComponentValue } from './shared'

const ComponentsDataForm: React.FC<{
  allFormData?: any
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isEdit?: boolean
  isLoading?: boolean
}> = (props) => {
  const form = useForm({ resolver: yupResolver(componentDataSchema) })

  const [bpjsComponent] = useAsyncAction(payrollService.fetchBpjsComponent)

  const [pageError, setPageError] = useState<any>()
  const [componentData, setComponentData] = useState<{ benefits: IBenefitComponent[]; deductions: IDeductionComponent[] }>()
  if (pageError) throw pageError

  useEffect(() => {
    const load = async () => {
      try {
        const [benefits, deductions] = await Promise.all([
          payrollService.fetchBenefitComponents({ limit: 99999 }),
          payrollService.fetchDeductionComponents({ limit: 99999 }),
        ])

        setComponentData({
          benefits: benefits.content,
          deductions: deductions.content,
        })
      } catch (e) {
        setPageError(e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!props.defaultValue) return
    form.setValue('benefits', props.defaultValue.benefits || [defaultComponentValue])
    form.setValue('deductions', props.defaultValue.deductions || [defaultComponentValue])
  }, [props.defaultValue, form.setValue, form])

  const watchBenefits = form.watch('benefits')
  const watchDeductions = form.watch('deductions')

  const handleAddBenefit = () => {
    const benefits = form.getValues('benefits') || []
    form.setValue('benefits', [...benefits, defaultComponentValue])
  }

  const handleRemoveBenefit = (index: number) => {
    const benefits = form.getValues('benefits') || []
    form.setValue('benefits', [...benefits.filter((_, i) => i !== index)])
  }

  const handleAddDeduction = () => {
    const deductions = form.getValues('deductions') || []
    form.setValue('deductions', [...deductions, defaultComponentValue])
  }

  const handleRemoveDeduction = (index: number) => {
    const deductions = form.getValues('deductions') || []
    form.setValue('deductions', [...deductions.filter((_, i) => i !== index)])
  }

  const onSubmit = form.handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      {(!componentData || !bpjsComponent) && (
        <div className="flex items-center justify-center py-48">
          <Spinner className="text-primary-600" height={40} />
        </div>
      )}
      {componentData && bpjsComponent && (
        <>
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Components</h3>
              <p className="text-xs text-gray-500">Please Adjust Components You Would Like to Apply for this Employee</p>
            </div>
            <h3 className="text-sm font-semibold">Benefits</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent.paidByEmployer?.jht?.rate}%`} />
              <Input disabled label="Jaminan Kecelakaan Kerja (JKK)" value={props.allFormData?.payroll?.jkk + '%'} />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input disabled label="Jaminan Kematian (JKM)" value={`${bpjsComponent.paidByEmployer?.jkm?.rate}%`} />
              <Input
                disabled
                help={`JP Maximum Cap ${numberToCurrency(bpjsComponent.paidByEmployer?.jp?.maxCap)}*`}
                label="Jaminan Pensiun (JP)"
                value={`${bpjsComponent.paidByEmployer?.jp?.rate}%`}
              />
            </div>
            <Input
              disabled
              help={`KS Maximum Cap ${numberToCurrency(bpjsComponent.paidByEmployer?.jks?.maxCap)}*`}
              label="Jaminan Kesehatan (KS)"
              value={props.allFormData?.payroll?.notParticipateBpjs ? '0%' : bpjsComponent.paidByEmployer?.jks?.rate + '%'}
            />
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-3">
            {watchBenefits?.map((el, i) => {
              const selectedIds = watchBenefits.map((wb) => wb.componentId).filter((oid) => oid !== el.componentId)
              const remainingComponents = componentData.benefits.filter((el) => !selectedIds.includes(el.oid))

              return (
                <ComponentItem
                  components={remainingComponents}
                  form={form}
                  index={i}
                  item={el}
                  key={i}
                  onRemove={() => handleRemoveBenefit(i)}
                  type="benefits"
                />
              )
            })}
            <Button block color="primary" onClick={handleAddBenefit} type="button" variant="light">
              Add Component
            </Button>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-sm font-semibold">Deduction</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent.paidByEmployee?.jht?.rate}%`} />
              <Input
                disabled
                help={`JP Maximum Cap ${numberToCurrency(bpjsComponent.paidByEmployee?.jp?.maxCap)}*`}
                label="Jaminan Pensiun (JP)"
                value={`${bpjsComponent.paidByEmployee?.jp?.rate}%`}
              />
            </div>

            <Input
              disabled
              help={`KS Maximum Cap ${numberToCurrency(bpjsComponent.paidByEmployee?.jks?.maxCap)}*`}
              label="Jaminan Kesehatan (KS)"
              required
              value={props.allFormData?.payroll?.notParticipateBpjs ? '0%' : bpjsComponent.paidByEmployee?.jks?.rate + '%'}
            />
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-3">
            {watchDeductions?.map((el, i) => {
              const selectedIds = watchDeductions.map((wb) => wb.componentId).filter((oid) => oid !== el.componentId)
              const remainingComponents = componentData.deductions.filter((el) => !selectedIds.includes(el.oid))

              return (
                <ComponentItem
                  components={remainingComponents}
                  form={form}
                  index={i}
                  item={el}
                  key={i}
                  onRemove={() => handleRemoveDeduction(i)}
                  type="deductions"
                />
              )
            })}
            <Button block color="primary" onClick={handleAddDeduction} type="button" variant="light">
              Add Component
            </Button>
          </CardBody>

          <CardFooter className="gap-3">
            <Button className="w-32" color="primary" disabled={props.isLoading} onClick={props.handlePrev} type="button" variant="light">
              Prev
            </Button>
            <Button className="w-32" color="primary" disabled={props.isLoading} loading={props.isLoading} type="submit">
              {props.isEdit ? 'Update' : 'Submit'}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ComponentsDataForm

import { payrollService } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, Spinner } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ComponentItem from './ComponentItem'
import { componentDataSchema, defaultComponentValue } from './shared'

const ComponentsDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading?: boolean
  isEdit?: boolean
}> = (props) => {
  const form = useForm({ resolver: yupResolver(componentDataSchema) })

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
      {!componentData && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}
      {componentData && (
        <>
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Components</h3>
              <p className="text-xs text-gray-500">Please Adjust Components You Would Like to Apply for this Employee</p>
            </div>
            <h3 className="text-sm font-semibold">Benefits</h3>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Jaminan Hari Tua (JHT)" disabled defaultValue="3.70%" />
              <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled defaultValue="0.24%" />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Jaminan Kematian (JKM)" disabled defaultValue="0.30%" />
              <Input label="Jaminan Pensiun (JP)" disabled defaultValue="2%" />
            </div>
            <Input label="Jaminan Kesehatan (KS)" disabled defaultValue="4%" help="KS Maximum Cap Rp. 480.000,00*" />
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-3">
            {watchBenefits?.map((el, i) => (
              <ComponentItem
                key={i}
                index={i}
                item={el}
                type="benefits"
                components={componentData}
                form={form}
                onRemove={handleRemoveBenefit}
              />
            ))}
            <Button type="button" block color="primary" variant="light" onClick={handleAddBenefit}>
              Add Component
            </Button>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-sm font-semibold">Deduction</h3>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Jaminan Hari Tua (JHT)" disabled defaultValue="3.70%" />
              <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled defaultValue="0.24%" />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Jaminan Kematian (JKM)" disabled defaultValue="0.30%" />
              <Input label="Jaminan Pensiun (JP)" disabled defaultValue="2%" />
            </div>
            <Input label="Jaminan Kesehatan (KS)" disabled defaultValue="4%" help="KS Maximum Cap Rp. 480.000,00*" />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Jaminan Hari Tua (JHT)" disabled defaultValue="2%" />
              <Input label="Jaminan Pensiun (JP)" disabled defaultValue="1%" />
            </div>

            <Input label="Jaminan Kesehatan (KS)" disabled defaultValue="1%" help="KS Maximum Cap Rp. 480.000,00*" />
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-3">
            {watchDeductions?.map((el, i) => (
              <ComponentItem
                key={i}
                index={i}
                item={el}
                type="deductions"
                components={componentData}
                form={form}
                onRemove={handleRemoveDeduction}
              />
            ))}
            <Button type="button" block color="primary" variant="light" onClick={handleAddDeduction}>
              Add Component
            </Button>
          </CardBody>

          <CardFooter className="gap-3">
            <Button type="button" color="primary" variant="light" className="w-32" disabled={props.isLoading} onClick={props.handlePrev}>
              Prev
            </Button>
            <Button type="submit" color="primary" className="w-32" disabled={props.isLoading} loading={props.isLoading}>
              {props.isEdit ? 'Update' : 'Submit'}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ComponentsDataForm

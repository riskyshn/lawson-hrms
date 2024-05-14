import type { IEmployeePayrollDetail, IEmployeePayrollResult } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Button, useToast } from '@jshrms/ui'
import { XIcon } from 'lucide-react'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import SideModal from '@/components/Elements/Modals/SideModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import numberToCurrency from '@/utils/number-to-currency'
import TableItem from './TableItem'

type PropTypes = {
  item?: IEmployeePayrollResult | null
  onClose?: () => void
  onRefresh?: () => void
}

const DetailEmployeePayrollModal: React.FC<PropTypes> = ({ item, onClose, onRefresh: updated }) => {
  const toast = useToast()

  const [detail, setDetail] = useState<IEmployeePayrollDetail>()
  const [amounts, setAmounts] = useState<number[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!item) return

    const load = async () => {
      try {
        const data = await payrollService.fetchPayrollRequestDetail(item.oid)
        setDetail(data)
        setAmounts(
          data.components?.map((el) => {
            if (el.type.oid === 'DEDUCTION') return Number('-' + el.amount)
            return Number(el.amount)
          }) || [],
        )
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
        onClose?.()
      }
    }

    load()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, refresh])

  const total = useMemo(() => {
    return numberToCurrency(amounts.reduce((acc, curr) => acc + curr, 0))
  }, [amounts])

  const onRefresh = () => {
    setRefresh((v) => !v)
    updated?.()
  }

  const handleClose = () => {
    onClose?.()
    setTimeout(() => {
      setDetail(undefined)
    }, 200)
  }

  return (
    <SideModal className="divide-y bg-white" show={!!item}>
      <LoadingScreen className="flex-1 p-0" show={!detail} />

      {detail && (
        <>
          <div className="flex items-center gap-3 p-3">
            <Avatar className="bg-primary-50 text-primary-700" name={`${detail?.name}`} size={48} />
            <div className="flex-1">
              <h3 className="font-semibold capitalize">{detail?.name}</h3>
              <span className="block text-xs">{detail.employeeCode}</span>
            </div>
            <Button color="error" iconOnly onClick={handleClose} type="button" variant="light">
              <XIcon size={18} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <MainTable
              bodyItems={
                detail.components?.map((el, i) => ({
                  children: (
                    <TableItem
                      {...el}
                      itemId={detail.oid}
                      onChange={(value) => {
                        setAmounts((old) => {
                          old[i] = value
                          return [...old]
                        })
                      }}
                      onRefresh={onRefresh}
                    />
                  ),
                })) || []
              }
              headerItems={[
                { children: 'Name', className: 'text-left' },
                { children: 'Type', className: 'text-left' },
                { children: 'Amount', className: 'text-left w-64' },
                { children: '', className: 'w-40' },
              ]}
            />
          </div>

          <div className="flex justify-between px-3 py-6 text-right font-semibold">
            <span className="block">Total Payroll :</span>
            <span className="block">{total}</span>
          </div>
        </>
      )}
    </SideModal>
  )
}

export default DetailEmployeePayrollModal

import React, { useState } from 'react'
import { payrollService } from '@jshrms/shared/services'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { Button, ButtonProps, useToast } from '@jshrms/ui'
import moment from 'moment'

const ExportButton: React.FC<{ oid: string; title: string } & ButtonProps> = ({ oid, title, ...props }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleExport = async () => {
    setLoading(true)
    try {
      const response = await payrollService.exportPayrollRequest(oid)
      // Assuming the response.data is the file content
      const decodedData = atob(response.data)
      const uint8Array = new Uint8Array(decodedData.length)
      for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i)
      }

      const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      // Create a link element, set its href and download attributes, then trigger a click event to initiate the download
      const downloadLink = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      downloadLink.href = url
      downloadLink.download = `${title.trim().replace(/ /g, '-').toLowerCase()}-[${moment().format('DD-MMMM-Y')}]-[${moment().format('HH-mm-SS')}].xlsx`
      document.body.appendChild(downloadLink)
      downloadLink.click()

      // Clean up: remove the link and revoke the Object URL to free up memory
      document.body.removeChild(downloadLink)
      window.URL.revokeObjectURL(url)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return <Button {...props} disabled={loading} loading={loading} onClick={handleExport} type="button" />
}

export default ExportButton

import type { PDFDocumentProxy } from 'pdfjs-dist'
import { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const PdfViewer: React.FC<{ url: string }> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>()

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages)
  }

  return (
    <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} width={720} />
      ))}
    </Document>
  )
}

export default PdfViewer

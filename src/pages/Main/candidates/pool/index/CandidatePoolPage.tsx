import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { BaseInput, Button, Card, CardBody, Pagination, PaginationItem, Select } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon, FileSpreadsheetIcon, FilterIcon, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Table from './components/Table'
import PreviewVIdeoResumeModal from './components/PreviewVIdeoResumeModal'
import { useState } from 'react'
import PreviewPdfResumeModal from './components/PreviewPdfResumeModal'
import ApplyVacancyModal from '../../Modals/ApplyVacancyModal'

const CandidatePoolPage: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        title="Candidate Pool"
        breadcrumb={[{ text: 'Candidates' }, { text: 'Cadiadate Pool' }]}
        actions={
          <Button
            as={Link}
            to="/job/management/recruitment-stages"
            color="success"
            className="gap-2"
            rightChild={<FileSpreadsheetIcon size={18} />}
          >
            Export To Excel
          </Button>
        }
      />

      <PreviewVIdeoResumeModal url={previewVideoModalUrl} onClose={() => setPreviewVideoModalUrl(null)} />
      <PreviewPdfResumeModal url={previewPdfModalUrl} onClose={() => setPreviewPdfModalUrl(null)} />

      <Container className="relative flex flex-col gap-3 pb-3 xl:pb-8">
        <Card>
          <CardBody>
            <ApplyVacancyModal />
          </CardBody>
        </Card>
        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Candidate List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">200+ Candidates</span> in total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex flex-1">
                    <BaseInput type="text" placeholder="Search..." className="peer w-full rounded-r-none lg:w-64" />
                    <Button iconOnly color="primary" className="rounded-l-none">
                      <SearchIcon size={16} />
                    </Button>
                  </div>
                  <Button iconOnly type="button" color="primary" onClick={toggleOpen}>
                    <FilterIcon size={16} />
                  </Button>
                </div>
              </div>
              {open && (
                <div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-3">
                  <Select placeholder="All Position" options={[]} />
                  <Select placeholder="All Province" options={[]} />
                  <Select placeholder="All Education" options={[]} />
                </div>
              )}
            </>
          )}
          body={
            <Table
              setPreviewVideoModalUrl={(url) => setPreviewVideoModalUrl(url)}
              setPreviewPdfModalUrl={(url) => setPreviewPdfModalUrl(url)}
            />
          }
          footer={
            <Pagination>
              <PaginationItem disabled>
                <ChevronLeftIcon />
              </PaginationItem>
              <PaginationItem active>1</PaginationItem>
              <PaginationItem>2</PaginationItem>
              <PaginationItem>3</PaginationItem>
              <PaginationItem>4</PaginationItem>
              <PaginationItem>5</PaginationItem>
              <PaginationItem>6</PaginationItem>
              <PaginationItem>
                <ChevronRightIcon />
              </PaginationItem>
            </Pagination>
          }
        />
      </Container>
    </>
  )
}

export default CandidatePoolPage
import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import { BaseInput, Button, Select } from 'jobseeker-ui'
import { FilterIcon, SearchIcon } from 'lucide-react'
import Table from './components/Table'
import { useState } from 'react'
import PreviewVideoResumeModal from '../../Modals/PreviewVideoResumeModal'
import PreviewPdfResumeModal from '../../Modals/PreviewPdfResumeModal'
import usePagination from '@/hooks/use-pagination'

const CandidateShortlistedPage: React.FC = () => {
  const [previewVideoModalUrl, setPreviewVideoModalUrl] = useState<string | null>(null)
  const [previewPdfModalUrl, setPreviewPdfModalUrl] = useState<string | null>(null)

  const pagination = usePagination({ pathname: '/candidates/shortlisted', totalPage: 2, params: { search: 'querysearch' } })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Candidate' }, { text: 'Shortlisted' }]} title="Candidate Shortlisted" />

      <PreviewVideoResumeModal url={previewVideoModalUrl} onClose={() => setPreviewVideoModalUrl(null)} />
      <PreviewPdfResumeModal url={previewPdfModalUrl} onClose={() => setPreviewPdfModalUrl(null)} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2">
                    <span className="block text-lg font-semibold">Candidate List</span>
                    <span className="block text-sm">
                      You have <span className="text-primary-600">You have 21000 Candidates in total</span> in total
                    </span>
                  </div>
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
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default CandidateShortlistedPage

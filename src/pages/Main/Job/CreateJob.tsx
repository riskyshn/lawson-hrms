import CreateJobLayout from '@/components/Layout/MainLayout/Job/CreateJobLayout'
import PageHeader from '@/components/UI/PageHeader'

const CreateJobPage = () => {
  return (
    <>
      <PageHeader className="" breadcrumb={[{ text: 'Dashboard' }, { text: 'Create Job Posting' }]} title="Create Job Posting" />
      <CreateJobLayout />
    </>
  )
}

export default CreateJobPage

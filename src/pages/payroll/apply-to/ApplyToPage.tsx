import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Card, CardFooter } from 'jobseeker-ui'
import React from 'react'

const ApplyToPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Payroll' }, { text: 'Apply To' }]} title="Apply To" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form">
          <CardFooter>
            <Button type="button" color="primary">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default ApplyToPage

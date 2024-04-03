import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import HomeForm from './components/HomeForm'
import JobForm from './components/JobForm'
import { cmsService } from '@/services'
import { useNavigate } from 'react-router-dom'

const CmsPage: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [flag, setFlag] = useState<any>()
  const toast = useToast()
  const navigate = useNavigate()

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(2, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const [formValues, setFormValues] = useState<any>({
    homeData: {},
    JobData: {},
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cmsService.fetchCms()
        const homeData = {
          heroSectionAsset: data.hero?.asset || '',
          heroSectionHeading: data.hero?.heading || '',

          sectionAAsset: data.sectionA?.asset || '',
          sectionAHeading: data.sectionA?.heading || '',
          sectionAParagraph: data.sectionA?.paragraph || '',

          sectionBAsset: data.sectionB?.asset || '',
          sectionBHeading: data.sectionB?.heading || '',
          sectionBParagraph: data.sectionB?.paragraph || '',

          bannerAsset: data.banner?.asset || '',
          callToAction: data.banner?.callToAction || '',
        }

        const jobData = {
          findJobAsset: data.findJob?.asset || '',
          findJobHeading: data.findJob?.heading || '',

          registerAsset: data.register?.asset || '',
          registerHeading: data.register?.heading || '',
          registerSubheading: data.register?.subheading || '',

          loginAsset: data.login?.asset || '',
          loginHeading: data.login?.heading || '',
          loginSubheading: data.login?.subheading || '',

          backgroundColor: data.generalSettings?.backgroundColor || '',
          callToActionColor: data.generalSettings?.callToActionColor || '',
          headingColor: data.generalSettings?.headingColor || '',
          subheadingColor: data.generalSettings?.subheadingColor || '',
          paragraphColor: data.generalSettings?.paragraphColor || '',
        }

        setFormValues({ homeData: homeData, jobData: jobData })
        setFlag(data)
      } catch (error) {
        console.error('Error fetching CMS data:', error)
      }
    }

    fetchData()
  }, [])

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    setIsSubmitLoading(true)

    const payload = {
      heroAsset: formValues.homeData.heroSectionAsset,
      heroHeading: formValues.homeData.heroSectionHeading,
      aSectionAsset: formValues.homeData.sectionAAsset,
      aSectionHeading: formValues.homeData.sectionAHeading,
      aSectionParagraph: formValues.homeData.sectionAParagraph,
      bSectionAsset: formValues.homeData.sectionBAsset,
      bSectionHeading: formValues.homeData.sectionBHeading,
      bSectionParagraph: formValues.homeData.sectionBParagraph,
      bannerAsset: formValues.homeData.bannerAsset,
      bannerHeading: '-',
      bannerCallToAction: formValues.homeData.callToAction,
      findJobAsset: formValues.jobData.findJobAsset,
      findJobHeading: formValues.jobData.findJobHeading,
      registerAsset: formValues.jobData.registerAsset,
      registerHeading: formValues.jobData.registerHeading,
      registerSubheading: formValues.jobData.registerSubheading,
      loginAsset: formValues.jobData.loginAsset,
      loginHeading: formValues.jobData.loginHeading,
      loginSubheading: formValues.jobData.loginSubheading,
      settingFont: '-',
      settingBackgroundColor: formValues.jobData.backgroundColor,
      settingCallToActionColor: formValues.jobData.callToActionColor,
      settingHeadingColor: formValues.jobData.headingColor,
      settingSubheadingColor: formValues.jobData.subheadingColor,
      settingParagraphColor: formValues.jobData.paragraphColor,
    }

    if (flag) {
      try {
        await cmsService.updateCms(flag?.company?.oid, payload)

        toast('CMS successfully updated.', { color: 'success' })
        setIsSubmitLoading(false)
        navigate(`/cms`)
      } catch (error) {
        toast('An error occurred while updating the CMS.', { color: 'error' })
        setIsSubmitLoading(false)
      }
    } else {
      try {
        await cmsService.createCms(payload)

        toast('CMS successfully created.', { color: 'success' })
        setIsSubmitLoading(false)
        navigate(`/cms`)
      } catch (error) {
        toast('An error occurred while creating the CMS.', { color: 'error' })
        setIsSubmitLoading(false)
      }
    }
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'CMS' }]} />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { title: 'Homepage', details: 'Setup Your Homepage' },
            { title: 'Find Job & General Settings', details: 'Setup Your Find Job, Font, & Color' },
          ]}
        />

        {activeStep === 0 && (
          <HomeForm
            defaultValue={formValues.homeData}
            handlePrev={handlePrev}
            handleSubmit={(homeData) => handleStepSubmit({ ...formValues, homeData })}
            isLoading={isSubmitLoading}
          />
        )}
        {activeStep === 1 && (
          <JobForm
            defaultValue={formValues.jobData}
            handlePrev={handlePrev}
            handleSubmit={(jobData) => handleStepSubmit({ ...formValues, jobData })}
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

export default CmsPage

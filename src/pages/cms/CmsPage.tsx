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
    jobData: {},
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cmsService.fetchCms()

        const homeData = {
          heroAsset: data.hero?.asset || '',
          heroHeadingId: data.hero?.heading?.id || '',
          heroHeadingEn: data.hero?.heading?.en || '',

          sectionAAsset: data.sectionA?.asset || '',
          sectionAHeadingId: data.sectionA?.heading?.id || '',
          sectionAHeadingEn: data.sectionA?.heading?.en || '',
          sectionAParagraphId: data.sectionA?.paragraph?.id || '',
          sectionAParagraphEn: data.sectionA?.paragraph?.en || '',

          sectionBAsset: data.sectionB?.asset || '',
          sectionBHeadingId: data.sectionB?.heading?.id || '',
          sectionBHeadingEn: data.sectionB?.heading?.en || '',
          sectionBParagraphId: data.sectionB?.paragraph?.id || '',
          sectionBParagraphEn: data.sectionB?.paragraph?.en || '',

          bannerAsset: data.banner?.asset || '',
          bannerCallToAction: data.banner?.callToAction || '',
          bannerHeadingId: data.banner?.heading?.id || '',
          bannerHeadingEn: data.banner?.heading?.en || '',
        }

        const jobData = {
          findJobAsset: data.findJob?.asset || '',
          findJobHeadingId: data.findJob?.heading?.id || '',
          findJobHeadingEn: data.findJob?.heading?.en || '',

          registerAsset: data.register?.asset || '',
          registerHeadingId: data.register?.heading?.id || '',
          registerHeadingEn: data.register?.heading?.en || '',
          registerSubheadingId: data.register?.subheading?.id || '',
          registerSubheadingEn: data.register?.subheading?.en || '',

          loginAsset: data.login?.asset || '',
          loginHeadingId: data.login?.heading?.id || '',
          loginHeadingEn: data.login?.heading?.en || '',
          loginSubheadingId: data.login?.subheading?.id || '',
          loginSubheadingEn: data.login?.subheading?.en || '',

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
      heroAsset: data.homeData.heroAsset,
      heroHeading: {
        id: data.homeData.heroHeadingId,
        en: data.homeData.heroHeadingEn,
      },
      aSectionAsset: data.homeData.sectionAAsset,
      aSectionHeading: {
        id: data.homeData.sectionAHeadingId,
        en: data.homeData.sectionAHeadingEn,
      },
      aSectionParagraph: {
        id: data.homeData.sectionAParagraphId,
        en: data.homeData.sectionAParagraphEn,
      },
      bSectionAsset: data.homeData.sectionBAsset,
      bSectionHeading: {
        id: data.homeData.sectionBHeadingId,
        en: data.homeData.sectionBHeadingEn,
      },
      bSectionParagraph: {
        id: data.homeData.sectionBParagraphId,
        en: data.homeData.sectionBParagraphEn,
      },
      bannerAsset: data.homeData.bannerAsset,
      bannerHeading: {
        id: data.homeData.bannerHeadingId,
        en: data.homeData.bannerHeadingEn,
      },
      bannerCallToAction: data.homeData.bannerCallToAction,
      findJobAsset: data.jobData.findJobAsset,
      findJobHeading: {
        id: data.jobData.findJobHeadingId,
        en: data.jobData.findJobHeadingEn,
      },
      registerAsset: data.jobData.registerAsset,
      registerHeading: {
        id: data.jobData.registerHeadingId,
        en: data.jobData.registerHeadingEn,
      },
      registerSubheading: {
        id: data.jobData.registerSubheadingId,
        en: data.jobData.registerSubheadingEn,
      },
      loginAsset: data.jobData.loginAsset,
      loginHeading: {
        id: data.jobData.loginHeadingId,
        en: data.jobData.loginHeadingEn,
      },
      loginSubheading: {
        id: data.jobData.loginSubheadingId,
        en: data.jobData.loginSubheadingEn,
      },
      settingFont: '-',
      settingBackgroundColor: data.jobData.backgroundColor,
      settingCallToActionColor: data.jobData.callToActionColor,
      settingHeadingColor: data.jobData.headingColor,
      settingSubheadingColor: data.jobData.subheadingColor,
      settingParagraphColor: data.jobData.paragraphColor,
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

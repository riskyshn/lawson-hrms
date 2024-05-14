import type { ICms, IHomeData, IJobData } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stepper, useSteps, useToast } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { cmsService } from '@/services'
import HomeForm from './components/HomeForm'
import JobForm from './components/JobForm'

export const Component: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [flag, setFlag] = useState<ICms>()
  const toast = useToast()
  const navigate = useNavigate()

  const { activeStep, handleNext, handlePrev, isLastStep } = useSteps(2, {
    onNext() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    },
  })

  const [formValues, setFormValues] = useState<{ homeData?: IHomeData; jobData?: IJobData }>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await cmsService.fetchCms()

        const homeData = {
          bannerAsset: data.banner?.asset || '',
          bannerCallToAction: data.banner?.callToAction || '',
          bannerHeadingEn: data.banner?.heading?.en || '',

          bannerHeadingId: data.banner?.heading?.id || '',
          heroAsset: data.hero?.asset || '',
          heroHeadingEn: data.hero?.heading?.en || '',
          heroHeadingId: data.hero?.heading?.id || '',
          sectionAAsset: data.sectionA?.asset || '',

          sectionAHeadingEn: data.sectionA?.heading?.en || '',
          sectionAHeadingId: data.sectionA?.heading?.id || '',
          sectionAParagraphEn: data.sectionA?.paragraph?.en || '',
          sectionAParagraphId: data.sectionA?.paragraph?.id || '',
          sectionBAsset: data.sectionB?.asset || '',

          sectionBHeadingEn: data.sectionB?.heading?.en || '',
          sectionBHeadingId: data.sectionB?.heading?.id || '',
          sectionBParagraphEn: data.sectionB?.paragraph?.en || '',
          sectionBParagraphId: data.sectionB?.paragraph?.id || '',
        }

        const jobData = {
          backgroundColor: data.generalSettings?.backgroundColor || '',
          callToActionColor: data.generalSettings?.callToActionColor || '',
          findJobAsset: data.findJob?.asset || '',

          findJobHeadingEn: data.findJob?.heading?.en || '',
          findJobHeadingId: data.findJob?.heading?.id || '',
          headingColor: data.generalSettings?.headingColor || '',
          loginAsset: data.login?.asset || '',
          loginHeadingEn: data.login?.heading?.en || '',

          loginHeadingId: data.login?.heading?.id || '',
          loginSubheadingEn: data.login?.subheading?.en || '',
          loginSubheadingId: data.login?.subheading?.id || '',
          paragraphColor: data.generalSettings?.paragraphColor || '',
          registerAsset: data.register?.asset || '',

          registerHeadingEn: data.register?.heading?.en || '',
          registerHeadingId: data.register?.heading?.id || '',
          registerSubheadingEn: data.register?.subheading?.en || '',
          registerSubheadingId: data.register?.subheading?.id || '',
          subheadingColor: data.generalSettings?.subheadingColor || '',
        }

        setFormValues({ homeData: homeData, jobData: jobData })
        setFlag(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching CMS data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleStepSubmit = async (data: { homeData?: IHomeData; jobData?: IJobData }) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    setIsSubmitLoading(true)

    const payload = {
      aSectionAsset: data.homeData?.sectionAAsset,
      aSectionHeading: {
        en: data.homeData?.sectionAHeadingEn,
        id: data.homeData?.sectionAHeadingId,
      },
      aSectionParagraph: {
        en: data.homeData?.sectionAParagraphEn,
        id: data.homeData?.sectionAParagraphId,
      },
      bSectionAsset: data.homeData?.sectionBAsset,
      bSectionHeading: {
        en: data.homeData?.sectionBHeadingEn,
        id: data.homeData?.sectionBHeadingId,
      },
      bSectionParagraph: {
        en: data.homeData?.sectionBParagraphEn,
        id: data.homeData?.sectionBParagraphId,
      },
      bannerAsset: data.homeData?.bannerAsset,
      bannerCallToAction: data.homeData?.bannerCallToAction,
      bannerHeading: {
        en: data.homeData?.bannerHeadingEn,
        id: data.homeData?.bannerHeadingId,
      },
      findJobAsset: data.jobData?.findJobAsset,
      findJobHeading: {
        en: data.jobData?.findJobHeadingEn,
        id: data.jobData?.findJobHeadingId,
      },
      heroAsset: data.homeData?.heroAsset,
      heroHeading: {
        en: data.homeData?.heroHeadingEn,
        id: data.homeData?.heroHeadingId,
      },
      loginAsset: data.jobData?.loginAsset,
      loginHeading: {
        en: data.jobData?.loginHeadingEn,
        id: data.jobData?.loginHeadingId,
      },
      loginSubheading: {
        en: data.jobData?.loginSubheadingEn,
        id: data.jobData?.loginSubheadingId,
      },
      registerAsset: data.jobData?.registerAsset,
      registerHeading: {
        en: data.jobData?.registerHeadingEn,
        id: data.jobData?.registerHeadingId,
      },
      registerSubheading: {
        en: data.jobData?.registerSubheadingEn,
        id: data.jobData?.registerSubheadingId,
      },
      settingBackgroundColor: data.jobData?.backgroundColor,
      settingCallToActionColor: data.jobData?.callToActionColor,
      settingFont: '-',
      settingHeadingColor: data.jobData?.headingColor,
      settingParagraphColor: data.jobData?.paragraphColor,
      settingSubheadingColor: data.jobData?.subheadingColor,
    }

    if (flag?.company?.oid) {
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
            { details: 'Setup Your Homepage', title: 'Homepage' },
            { details: 'Setup Your Find Job, Font, & Color', title: 'Find Job & General Settings' },
          ]}
        />

        {activeStep === 0 && isLoading === false && (
          <HomeForm
            defaultValue={formValues?.homeData}
            handlePrev={handlePrev}
            handleSubmit={(homeData?: IHomeData) => handleStepSubmit({ ...formValues, homeData })}
            isLoading={isSubmitLoading}
          />
        )}
        {activeStep === 1 && isLoading === false && (
          <JobForm
            defaultValue={formValues?.jobData}
            handlePrev={handlePrev}
            handleSubmit={(jobData?: IJobData) => handleStepSubmit({ ...formValues, jobData })}
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

Component.displayName = 'CmsPage'

import BgImage from '@/assets/hero.webp'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import Logo from '@/components/Logo/Logo'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants/pubsub'
import shortenNumber from '@/utils/shorten-number'
import { Listbox } from '@headlessui/react'
import { BaseInput, Button, usePubSub } from 'jobseeker-ui'
import { BookMarkedIcon, CheckIcon, ChevronDownIcon, HeartIcon, ListFilterIcon, SearchIcon, XIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import FilterForm from './FilterForm'

const options = ['Show All', 'Never been offer', 'Your talent pool', 'Liked Candidate'].map((el) => ({
  label: el,
  value: el !== 'Show All' ? el.toLowerCase() : '',
}))

const ExplorePage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  // const [isGrid, setIsGrid] = useLocalStorageState('GRID_VIEW_EXPLORE', false)
  const [showFilter, setShowFilter] = useState(false)

  const pubSub = usePubSub()

  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const type = searchParams.get('type') || options[0].value

  const handleChange = (key: string, value?: string | null) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const handleReset = () => {
    searchParams.delete('q')
    setSearchParams(searchParams, { replace: true })
  }

  useEffect(() => {
    return pubSub.subscribe(ON_NAVBAR_SEARCH_CLICKED, () => {
      inputRef.current?.focus()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Dashboard' }, { text: 'Explore' }]} />

      <div className="relative z-10 border-b bg-white pb-3">
        <div className="background-animate relative h-20 overflow-hidden bg-gradient-to-r from-primary-400 to-primary-900 px-3 text-white">
          <span
            className="absolute inset-0 block bg-cover bg-fixed bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          />
          <Logo className="absolute right-3 top-1/2 ml-auto h-48 w-48 -translate-y-1/2 opacity-30 md:h-72 md:w-72 [&_path]:fill-white" />
        </div>

        {/* <div aria-hidden="true" className="background-animate flex h-20 overflow-hidden bg-gradient-to-r from-primary-800 to-primary-300" /> */}

        <Container className="-mt-8 flex flex-col justify-center gap-8">
          <div className="mx-auto flex w-full max-w-3xl">
            <div className="relative z-10 flex h-16 flex-1 rounded-lg bg-white shadow-xl shadow-gray-600/5">
              <div className="relative h-full flex-1">
                <BaseInput
                  ref={inputRef}
                  className="peer h-full border-0 px-14 text-base outline-none"
                  autoFocus
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleChange('q', e.currentTarget.value)}
                />
                <SearchIcon
                  size={18}
                  className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                />
                {search && (
                  <button
                    type="button"
                    className="absolute right-6 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 leading-none"
                    onClick={handleReset}
                  >
                    <XIcon aria-label="Reset" size={14} className="block text-white" />
                  </button>
                )}
              </div>
              <Listbox
                as="div"
                className="relative z-20 h-full py-4"
                value={options.find((el) => el.value === type)}
                onChange={(e) => handleChange('type', e.value)}
              >
                <Listbox.Button
                  as="button"
                  type="button"
                  className="flex h-full w-48 items-center justify-between border-l-2 bg-white px-6 text-sm font-normal outline-none"
                >
                  <span className="block">{options.find((el) => el.value === type)?.label}</span>
                  <ChevronDownIcon size={16} className="block" />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 mt-6 w-48 cursor-pointer list-none overflow-hidden rounded-lg border bg-white p-2 shadow-xl shadow-gray-600/5 outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ selected, active }) =>
                        twJoin('flex items-center rounded-lg px-3 py-2 text-xs', (selected || active) && 'bg-gray-100')
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className="block flex-1">{option.label}</span>
                          {selected && <CheckIcon size={14} className="text-gray-800" />}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>

          <div className="text-center">
            <h1 className="mb-4 text-2xl font-semibold leading-7 text-gray-900 first-letter:uppercase md:text-[2rem] md:leading-[2.375rem]">
              {search.trim() ? search : 'Explore Candidate'}
            </h1>
            {!search.trim() && <p className="text-gray-500">Try to type Jakarta, Product Manager, Shortlist</p>}
            {!!search.trim() && <p className="text-gray-500">215 search results found for: "{search}"</p>}
          </div>

          <div className="flex justify-end">
            {/* <Button iconOnly variant="light" onClick={() => setIsGrid((v) => !v)}>
              {isGrid ? <MenuIcon size={16} /> : <GripIcon size={16} />}
            </Button> */}

            <Button
              variant="light"
              className="min-w-24"
              leftChild={<ListFilterIcon size={16} className="mr-1" />}
              onClick={() => setShowFilter((v) => !v)}
            >
              Filters
            </Button>
          </div>
        </Container>
      </div>
      <FilterForm show={showFilter} />
      <Container className="py-3 xl:pb-8">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {dummyData.map((item, i) => {
            const detail = [item.gender, !!item.age && `Age ${item.age}`, item.last_edu].filter((el) => !!el).join(', ')
            const location = [item.district_name, item.city_name, item.province_name].filter((el) => !!el).join(', ')
            return (
              <li key={i} className="relative flex flex-col rounded-lg border bg-white">
                <div
                  className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-lg bg-gray-300 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.video_thumbnail || item.photo})` }}
                >
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-1/2 w-full bg-gradient-to-t from-transparent via-black/30 to-black/75"></div>
                    <div className="h-1/2 w-full bg-gradient-to-t from-black/75 via-black/50 to-transparent"></div>
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col p-3 text-white transition-all group-hover:bg-black/25">
                    <div className="flex flex-1 items-start">
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="block truncate text-base capitalize leading-none">{item.full_name}</span>
                        <span className="block text-xs">{moment.utc(item.login_date).fromNow()}</span>
                      </div>
                      <button className="flex flex-col items-center justify-center text-sm leading-none outline-none">
                        <HeartIcon size={20} className={item.liked_by_me ? 'fill-red-600 stroke-none' : 'stroke-white text-black/20'} />
                        <span className="block text-center text-xs font-semibold text-white">{shortenNumber(item.total_likes)}</span>
                      </button>
                    </div>

                    <div className="flex items-end">
                      <p className="flex flex-1 flex-col gap-1 text-xs leading-snug">
                        {detail}
                        <br />
                        {location}
                      </p>
                    </div>

                    <h1 title={item.position} className="mb-3 w-full truncate font-semibold capitalize">
                      {item.position}
                    </h1>

                    <div className="flex gap-3">
                      <Button color="primary" className="flex-1">
                        Offer Job
                      </Button>
                      <Button iconOnly variant="light" color="primary" className="border-0 bg-white">
                        <BookMarkedIcon size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}

export default ExplorePage

const dummyData = [
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-06/O3ccd25BowBJCEbfOUDUbfFFsohzo9Kvq9uTaBkx.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-06/WkbvtoZq0GQsWQ2C882hT70kXZJO3YCqZ6ekTP6f.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-06/PQETZfTqnmIgSiBSx7HkIdFoH8rlsOTUtELWABXr.jpg',
    phone: '89505824262',
    position: 'Cleaning Service / Office Boy (Layanan Kebersihan)',
    notif_token_mobile: null,
    login_date: '2023-09-06T06:42:25',
    gender: 'Male',
    district_name: 'Cikarang Timur',
    city_name: 'Kabupaten Bekasi',
    job_func_desc: 'Cleaning Service / Office Boy',
    province_name: 'Jawa Barat',
    last_edu: '',
    photo_validation: 1,
    age: 21,
    distance: 913990,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 0,
    oid: '658cce60e55aaf75c32f7a4b',
    candidate_id: 2495442,
    full_name: 'Achmad Fauzi',
    modified: '2024-03-04T06:13:13.384',
    total_likes: 1,
    total_views: 98,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-09/5TT34TYTQCYwjWU1MBHoBx78GLfuvvPj4Ia7BBOD.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-09/wlO1V4uOOeG9BdSXfharisfbhrzBPjX159y1TWPD.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-09/zdGMCasAZJzDApCM65UjZd0zz6K6A0g0VmZFb7OY.jpg',
    phone: '85781567039',
    position: 'Administrasi, Admin (Administration)',
    notif_token_mobile: null,
    login_date: '2023-09-19T14:36:18',
    gender: null,
    district_name: 'Sawah Besar',
    city_name: 'Jakarta Pusat',
    job_func_desc: 'Administration',
    province_name: 'DKI Jakarta',
    last_edu: '',
    photo_validation: 1,
    age: 0,
    distance: 953943,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 0,
    oid: '658cd6d1e55aaf75c32fb44a',
    candidate_id: 2515067,
    full_name: 'Najwa syawalimar',
    modified: '2024-03-05T02:31:42.524',
    total_likes: 2,
    total_views: 107,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-08/wSvz8pwp2omYoGW9OX8Jn506rtwr868UscL5aNqI.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-08/c3PgPELI22Bfp0DeXCbrt232Lc89Ilst4FTlghAV.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-08/Cx8HPHvaJL4jXuVoDISEB1ZZp8L287EFzTG8EivA.jpg',
    phone: '81378308966',
    position: 'fisioterapi',
    notif_token_mobile: null,
    login_date: '2023-09-18T16:01:19',
    gender: 'Male',
    district_name: 'Jagakarsa',
    city_name: 'Jakarta Selatan',
    job_func_desc: '',
    province_name: 'DKI Jakarta',
    last_edu: 'Diploma',
    photo_validation: 1,
    age: 24,
    distance: 955219,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 1,
    oid: '658cd294e55aaf75c32fad99',
    candidate_id: 2512595,
    full_name: 'eghi malvino',
    modified: '2024-01-26T21:32:53.942',
    total_likes: 0,
    total_views: 100,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-11/PilzMLEIQQUxRAajqYwedDH5JMgRHsuAlylWqwYq.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-11/2LW0U8KrMeTnB0xFYHIwbWduj1mpkT6bbaTZGB4M.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-11/GcLGsnQZpnmVU2WDpo9iq8Q96mURDUMEfDHHcTpy.jpg',
    phone: '85723739647',
    position: 'Administration (Administrasi, Admin)',
    notif_token_mobile: null,
    login_date: '2023-11-26T22:03:50',
    gender: 'Male',
    district_name: 'Bungursari',
    city_name: 'Kota Tasikmalaya',
    job_func_desc: 'Administration',
    province_name: 'Jawa Barat',
    last_edu: 'Bachelor',
    photo_validation: 1,
    age: 28,
    distance: 777753,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 1,
    oid: '658cdb14e55aaf75c32febe4',
    candidate_id: 2529004,
    full_name: 'Moh Lutfi Sobari',
    modified: '2024-01-26T21:32:09.511',
    total_likes: 0,
    total_views: 109,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-07/Ah025xwFGEz4EbWKyKJcoy6IK8TwxcK4p73AZFPL.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-07/DfEbKDR0IoFW4icB7Pjz9e0witvhMZYarDIFunsu.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-07/45cf436b6b3d5d2b1eeb381d46c04b3b.jpeg',
    phone: '895636786673',
    position: 'Pemasaran Digital, Socmed, Social Media, Media Sosial (Marketing Digital)',
    notif_token_mobile: null,
    login_date: '2023-11-16T18:26:37',
    gender: 'Male',
    district_name: 'Kebayoran Baru',
    city_name: 'Jakarta Selatan',
    job_func_desc: 'Marketing Digital',
    province_name: 'DKI Jakarta',
    last_edu: 'Senior/Vocational High School',
    photo_validation: 1,
    age: 22,
    distance: 955522,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 1,
    oid: '658cd294e55aaf75c32f8d6b',
    candidate_id: 2501898,
    full_name: 'Sifa Bayu Al Fatah',
    modified: '2024-01-26T18:22:30.931',
    total_likes: 1,
    total_views: 103,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-09/14mg5c4gc2qyP1m54FbnPipjJVp2AZDvCoPj7mro.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-09/T4tDowPrmf5COVBg80IbmssnCsCMAuuR9Y5glcVg.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-09/rXl0wMX93oy9RoTaheTB5hQWuTWCmXy20OkjZ1gB.jpg',
    phone: '87889893608',
    position: 'Bisnis Manajemen (Business Management)',
    notif_token_mobile: null,
    login_date: '2023-09-04T20:46:41',
    gender: 'Female',
    district_name: 'Pademangan',
    city_name: 'Jakarta Utara',
    job_func_desc: 'Business Management',
    province_name: 'DKI Jakarta',
    last_edu: '',
    photo_validation: 1,
    age: 18,
    distance: 954859,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 1,
    oid: '658cd6d1e55aaf75c32fb445',
    candidate_id: 2514780,
    full_name: 'Devina Syahrani',
    modified: '2024-03-29T12:36:33.174',
    total_likes: 0,
    total_views: 111,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-09/UcHFjVaprwD3g2oNy4rHmBznpWDG79cyqDcmR1J4.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-09/ZXZJi7lgaagm7DrhpTYPIiFwi9Ob5FzO4nns8Lmi.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-09/OWvbxRj5svWvCDMfHDUfHSba7rqbeoVf55YV6de1.jpg',
    phone: '81356077482',
    position: 'Front End Developer (Front End Developer)',
    notif_token_mobile: null,
    login_date: '2023-09-19T15:36:07',
    gender: null,
    district_name: 'Tamalate',
    city_name: 'Makassar',
    job_func_desc: 'Front End Developer',
    province_name: 'Sulawesi Selatan',
    last_edu: 'Bachelor',
    photo_validation: 1,
    age: 0,
    distance: 592333,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 0,
    oid: '658cd6d1e55aaf75c32fba0f',
    candidate_id: 2516282,
    full_name: 'Andi Muh Mappanganro',
    modified: '2024-01-26T18:58:40.642',
    total_likes: 0,
    total_views: 101,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-07/HL8xJFWZBOCYbTykScAgtrY202Psw7wNIwD97gAC.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-07/f73VSW2NJDxNxbgzSinHHuuN4pN27uovl8k7NAiL.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-07/yIFphtI9NJlsSNViFnMYJxR9tcK0iNS2kaoIrSJm.jpg',
    phone: '81296197041',
    position: 'Risk Management (Manajemen Resiko)',
    notif_token_mobile: null,
    login_date: '2023-07-13T13:36:07',
    gender: 'Male',
    district_name: 'Subang',
    city_name: 'Subang',
    job_func_desc: 'Risk Management',
    province_name: 'Jawa Barat',
    last_edu: 'Bachelor',
    photo_validation: 1,
    age: 30,
    distance: 845810,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 1,
    oid: '658cce60e55aaf75c32f8099',
    candidate_id: 2498836,
    full_name: 'Fiki Firmansyah',
    modified: '2024-03-15T03:03:50.286',
    total_likes: 1,
    total_views: 144,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-09/VrdzOkEByjCgEdJzFfGSoKYIrg69J9FktUJ0pb6B.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-09/ZcCN3ytIS8jxgmTTHzUA4xBhpnCHiuzO2BFgrckK.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2023-09/Kev8vkhbwaoP9vlrKrqPOgAvKmPyjDGVfP1mgE69.jpg',
    phone: '89515718492',
    position: 'Retailer (Pengecer)',
    notif_token_mobile: null,
    login_date: '2023-12-05T20:20:36',
    gender: 'Male',
    district_name: 'Ciruas',
    city_name: 'Kabupaten Serang',
    job_func_desc: 'Retailer',
    province_name: 'Banten',
    last_edu: 'Senior/Vocational High School',
    photo_validation: 1,
    age: 25,
    distance: 978573,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 0,
    oid: '658cd6d1e55aaf75c32fc065',
    candidate_id: 2517270,
    full_name: 'kevin purwanto',
    modified: '2024-01-26T18:17:16.918',
    total_likes: 1,
    total_views: 122,
  },
  {
    video: 'http://content.jobseeker.company/uploads/candidate/resume/video/2023-03/szOkNWOIFc07LdicbSuSFRIljPgUxNKs87NzAQv6.mp4',
    video_thumbnail:
      'http://content.jobseeker.company/uploads/candidate/resume/video/thumbnail/2023-03/0gMo1Bw5WF2mIiL9vuIsHZ7dmTOry4KveXs5LeyY.png',
    photo: 'http://content.jobseeker.company/uploads/candidate/photo/2022-12/v72zlUa9IJIU2Ms3SRmB7xHqHZpLR76ppAwgOdx3.jpg',
    phone: '89693918164',
    position: 'Operational (Operasional)',
    notif_token_mobile: null,
    login_date: '2023-06-20T06:10:30',
    gender: 'Male',
    district_name: null,
    city_name: 'Jakarta Utara',
    job_func_desc: 'Operational',
    province_name: 'DKI Jakarta',
    last_edu: 'Bachelor',
    photo_validation: 1,
    age: 30,
    distance: 945746,
    liked_by_me: 0,
    is_recruit: 0,
    pagination_token: null,
    is_complete: 0,
    oid: '658cb7d7875c9800daa26183',
    candidate_id: 2465786,
    full_name: 'Haris Lapepo',
    modified: '2024-01-26T18:22:41.966',
    total_likes: 0,
    total_views: 122,
  },
]

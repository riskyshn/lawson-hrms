import BgImage from '@/assets/hero.webp'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import Logo from '@/components/Logo/Logo'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants/pubsub'
import { candidateExploreService } from '@/services'
import shortenNumber from '@/utils/shorten-number'
import { Listbox } from '@headlessui/react'
import { BaseInput, Button, useAsyncSearch, usePubSub } from 'jobseeker-ui'
import { BookMarkedIcon, CheckIcon, ChevronDownIcon, HeartIcon, ListFilterIcon, SearchIcon, XIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import FilterForm from './components/FilterForm'

const options = ['Show All', 'Never been offer', 'Your talent pool', 'Liked Candidate'].map((el) => ({
  label: el,
  value: el !== 'Show All' ? el.toLowerCase() : '',
}))

export const Component: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  // const [isGrid, setIsGrid] = useLocalStorageState('GRID_VIEW_EXPLORE', false)
  const [showFilter, setShowFilter] = useState(false)
  const [latlng] = useState<[number, number]>([-8.4095167, 115.188915])

  const [searchParams, setSearchParams] = useSearchParams()
  const pubSub = usePubSub()

  const search = searchParams.get('q') || ''
  const type = searchParams.get('type') || options[0].value

  const { pageData } = useAsyncSearch(candidateExploreService.exploreCandidate, {
    lat: latlng[0],
    lng: latlng[1],
    limit: 20,
  })

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
          {pageData?.content.map((item, i) => {
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
                        <span className="block text-xs">{moment.utc(item.login_date).local().fromNow()}</span>
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

Component.displayName = 'CandidateExplorePage'

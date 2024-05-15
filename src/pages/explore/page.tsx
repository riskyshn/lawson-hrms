import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Listbox } from '@headlessui/react'
import { BaseInput, Button, Container, PageHeader, usePubSub } from 'jobseeker-ui'
import { CheckIcon, ChevronDownIcon, ListFilterIcon, SearchIcon, XIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import BgImage from '@/assets/hero.webp'
import Logo from '@/components/Logo/Logo'
import { ON_NAVBAR_SEARCH_CLICKED } from '@/constants/pubsub'
import { useOptionSearchParam } from '@/hooks'
import FilterForm from './components/FilterForm'
import ListItem, { ListItemSkeleton } from './components/ListItem'
import useCoreAsyncSearch from './hooks/use-core-async-search'

const options = ['Show All', 'Never been offer', 'Your talent pool', 'Liked Candidate'].map((el) => ({
  label: el,
  value: el !== 'Show All' ? el.toLowerCase() : '',
}))

export const Component: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  // const [isGrid, setIsGrid] = useLocalStorageState('GRID_VIEW_EXPLORE', false)
  const [showFilter, setShowFilter] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const pubSub = usePubSub()

  const search = searchParams.get('q')
  const type = searchParams.get('type') || options[0].value
  const minAge = searchParams.get('min-age')
  const maxAge = searchParams.get('max-age')
  const [gender] = useOptionSearchParam('gender')
  const [city] = useOptionSearchParam('city')
  const [education] = useOptionSearchParam('education')

  const { results, query, loading, infiniteRef, total, hasNextPage } = useCoreAsyncSearch(search?.trim() || '', {
    min_age: minAge ? Number(minAge) : undefined,
    max_age: maxAge ? Number(maxAge) : undefined,
    gender: gender?.value || undefined,
    city: city?.value || undefined,
    educ: education?.value || undefined,
  })

  const handleChange = (key: string, value?: null | string) => {
    if (value?.trim()) {
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
        <div className="relative h-20 animate-[position_20s_infinite] overflow-hidden bg-gradient-to-r from-primary-400 to-primary-900 bg-[length:400%] px-3 text-white">
          <span
            className="absolute inset-0 block bg-cover bg-fixed bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          />
          <Logo className="absolute right-3 top-1/2 ml-auto h-48 w-48 -translate-y-1/2 opacity-30 md:h-72 md:w-72 [&_path]:fill-white" />
        </div>

        <Container className="-mt-8 flex flex-col justify-center gap-8">
          <div className="mx-auto flex w-full max-w-3xl">
            <div className="relative z-10 flex h-16 flex-1 rounded-lg bg-white shadow-xl shadow-gray-600/5">
              <div className="relative h-full flex-1">
                <BaseInput
                  autoFocus
                  className="peer h-full border-0 px-14 text-base outline-none"
                  onChange={(e) => handleChange('q', e.currentTarget.value)}
                  placeholder="Search..."
                  ref={inputRef}
                  value={search || ''}
                />
                <SearchIcon
                  className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                  size={18}
                />
                {search && (
                  <button
                    className="absolute right-6 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 leading-none"
                    onClick={handleReset}
                    type="button"
                  >
                    <XIcon aria-label="Reset" className="block text-white" size={14} />
                  </button>
                )}
              </div>
              <Listbox
                as="div"
                className="relative z-20 h-full py-4"
                onChange={(e) => handleChange('type', e.value)}
                value={options.find((el) => el.value === type)}
              >
                <Listbox.Button
                  as="button"
                  className="flex h-full w-48 items-center justify-between border-l-2 bg-white px-6 text-sm font-normal outline-none"
                  type="button"
                >
                  <span className="block">{options.find((el) => el.value === type)?.label}</span>
                  <ChevronDownIcon className="block" size={16} />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 mt-6 w-48 cursor-pointer list-none overflow-hidden rounded-lg border bg-white p-2 shadow-xl shadow-gray-600/5 outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      className={({ active, selected }) =>
                        twJoin('flex items-center rounded-lg px-3 py-2 text-xs', (selected || active) && 'bg-gray-100')
                      }
                      key={option.value}
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span className="block flex-1">{option.label}</span>
                          {selected && <CheckIcon className="text-gray-800" size={14} />}
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
              {query?.trim() ? query : 'Explore Candidate'}
            </h1>
            {!query?.trim() && <p className="text-gray-500">Try to type Jakarta, Product Manager, Shortlist</p>}
            {!!query?.trim() && (
              <p className="text-gray-500">
                {total} search results found for: "{query}"
              </p>
            )}
          </div>

          <div className="flex justify-end">
            {/* <Button iconOnly variant="light" onClick={() => setIsGrid((v) => !v)}>
              {isGrid ? <MenuIcon size={16} /> : <GripIcon size={16} />}
            </Button> */}

            <Button
              className="min-w-24"
              leftChild={<ListFilterIcon className="mr-1" size={16} />}
              onClick={() => setShowFilter((v) => !v)}
              variant="light"
            >
              Filters
            </Button>
          </div>
        </Container>
      </div>
      <FilterForm show={showFilter} />
      <Container className="py-3 xl:pb-8">
        <ul className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {results.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </ul>
        {loading && (
          <>
            <ul className="hidden grid-cols-4 gap-3 xl:grid">
              {Array.from(Array(8)).map((_, i) => (
                <ListItemSkeleton key={i} />
              ))}
            </ul>
            <ul className="hidden grid-cols-2 gap-3 md:grid xl:hidden">
              {Array.from(Array(4)).map((_, i) => (
                <ListItemSkeleton key={i} />
              ))}
            </ul>
            <ul className="grid grid-cols-1 gap-3 md:hidden">
              {Array.from(Array(2)).map((_, i) => (
                <ListItemSkeleton key={i} />
              ))}
            </ul>
          </>
        )}
        {!loading && hasNextPage && <div className="h-px" ref={infiniteRef} />}
      </Container>
    </>
  )
}

Component.displayName = 'CandidateExplorePage'

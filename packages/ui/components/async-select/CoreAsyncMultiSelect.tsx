import type { BaseAction, CoreAsyncMultiSelectFn, CoreAsyncMultiSelectProps } from './types'
import { twMerge } from 'tailwind-merge'
import useCoreAsyncSearch from './hooks/use-core-async-search'
import ListboxButton from './ListboxButton'
import ListboxOptions from './ListboxOptions'

const CoreAsyncMultiSelect: React.FC<CoreAsyncMultiSelectProps<BaseAction>> = (props) => {
  const {
    className,
    error,
    id,
    onChange,
    placeholder,
    searchPlaceholder,
    toggleClassName,
    value = [],
    withReset,
    open,
    hideSearch,
    disableInfiniteScroll,
  } = props

  const { infiniteRef, rootRef, results, search, setSearch, message, loading, page } = useCoreAsyncSearch(props)

  const handleReset: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault()
    onChange?.([])
  }

  const listboxButtonProps = {
    id,
    error: !!error,
    className: toggleClassName,
    handleReset: withReset ? handleReset : undefined,
    value:
      value
        ?.map?.((el) => el?.label || el?.value || '')
        .filter((el) => !!el)
        .join(', ') || '',
    placeholder,
  }

  const listboxOptionsProps = {
    options: results,
    searchPlaceholder,
    message,
    search: !hideSearch ? { value: search, onValueChange: setSearch } : undefined,
    loading,
    value,
  }

  return (
    <div className={twMerge('relative', className)}>
      <ListboxButton open={open} {...listboxButtonProps} />
      <ListboxOptions
        ref={rootRef}
        endOfRoot={page > 0 && !disableInfiniteScroll && open && !loading && <li className="h-px w-full" ref={infiniteRef} />}
        open={open}
        {...listboxOptionsProps}
      />
    </div>
  )
}

export default CoreAsyncMultiSelect as typeof CoreAsyncMultiSelectFn

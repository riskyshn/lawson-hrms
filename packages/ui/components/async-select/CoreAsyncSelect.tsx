import type { BaseAction, CoreAsyncSelectFn, CoreAsyncSelectProps } from './types'
import { twMerge } from 'tailwind-merge'
import useCoreAsyncSearch from './hooks/use-core-async-search'
import ListboxButton from './ListboxButton'
import ListboxOptions from './ListboxOptions'

const CoreAsyncSelect: React.FC<CoreAsyncSelectProps<BaseAction>> = (props) => {
  const {
    className,
    error,
    id,
    onChange,
    placeholder,
    searchPlaceholder,
    toggleClassName,
    value,
    withReset,
    open,
    hideSearch,
    disableInfiniteScroll,
  } = props

  const { infiniteRef, rootRef, results, search, setSearch, message, loading, page } = useCoreAsyncSearch(props)

  const handleReset: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault()
    // @ts-expect-error
    onChange?.(null)
  }

  const listboxButtonProps = {
    id,
    error: !!error,
    className: toggleClassName,
    handleReset: withReset ? handleReset : undefined,
    value: value?.label || value?.value || '',
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
        isSingle
        {...listboxOptionsProps}
      />
    </div>
  )
}

export default CoreAsyncSelect as typeof CoreAsyncSelectFn

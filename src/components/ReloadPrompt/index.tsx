import { Button } from 'jobseeker-ui'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'
import { useRegisterSW } from 'virtual:pwa-register/react'

export const ReloadPrompt: React.FC = () => {
  const buildDate = '__DATE__'
  const reloadSW = '__RELOAD_SW__'

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`)
      // @ts-expect-error just ignore
      if (reloadSW === 'true') {
        r &&
          setInterval(() => {
            console.log('Checking for sw update')
            r.update()
          }, 20000 /* 20s for testing purposes */)
      } else {
        // eslint-disable-next-line prefer-template
        console.log('SW Registered:', r)
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  return (
    <div
      className={twMerge(
        'fixed bottom-3 right-3 z-[9999999] w-full max-w-sm transition-all',
        !needRefresh && 'pointer-events-none opacity-0',
      )}
    >
      <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-2xl">
        <h3 className="text-lg font-semibold">New content available</h3>
        <p className="text-sm font-light">
          New content available, click on reload button to update.
          <strong>{moment(buildDate).fromNow()}</strong>
        </p>
        <div className="flex justify-end gap-2">
          <Button type="button" size="small" color="primary" onClick={() => updateServiceWorker(true)}>
            Reload
          </Button>
          <Button type="button" size="small" color="error" variant="light" onClick={() => setNeedRefresh(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReloadPrompt

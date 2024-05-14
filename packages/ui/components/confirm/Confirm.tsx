import type { ConfirmProps } from './types'
import { HelpCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { variants } from '../../utils'
import Button from '../button/Button'
import { Modal } from '../modal'

const Confirm: React.FC<ConfirmProps> = (props) => {
  return (
    <Modal show={!!props.isShow} className="max-w-md divide-y-0 p-6">
      <div className="mb-3 flex justify-center pt-8">{icons(props.icon || 'primary')}</div>
      <div className="mb-3">
        <h3 className="text-center text-2xl font-bold">{props.title || 'Are you sure?'}</h3>
        {!!props.text && <p className="text-center text-sm">{props.text}</p>}
      </div>
      <div className="flex items-center justify-center gap-3 p-3">
        <Button
          type="button"
          color={props.confirmBtnColor || 'primary'}
          variant={props.confirmBtnVariant}
          className={twMerge('w-32', props.confirmBtnClass)}
          onClick={props.onConfirm}
        >
          {props.confirmBtnText || 'Yes, do it!'}
        </Button>
        <Button
          type="button"
          color={props.cancelBtnColor || 'error'}
          variant={props.cancelBtnVariant}
          className={twMerge('w-32', props.cancelBtnClass)}
          onClick={props.onCancel}
        >
          {props.cancelBtnText || 'Cancel'}
        </Button>
      </div>
    </Modal>
  )
}

const icons = variants({
  primary: <HelpCircle className="text-primary-500" size={100} />,
  warning: <HelpCircle className="text-warning-500" size={100} />,
  error: <HelpCircle className="text-error-500" size={100} />,
})

export default Confirm

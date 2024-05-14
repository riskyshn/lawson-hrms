import { Color } from '../../types'

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  color?: Color
  hideable?: boolean
}

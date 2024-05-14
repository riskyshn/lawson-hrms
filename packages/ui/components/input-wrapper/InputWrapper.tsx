import type { InputWrapperProps } from './types'

const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  const { htmlFor, label, labelRequired, onLabelClick, error, help, className, wrapperClassName, children, ...rest } = props
  return (
    <div className={className} {...rest}>
      {!!label && (
        <label htmlFor={htmlFor} className="text-xs" onClick={onLabelClick}>
          {label}
          {labelRequired && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className={wrapperClassName}>{children}</div>
      {!!error && <span className="block text-xs text-red-600">{error}</span>}
      {!!help && <span className="block text-xs italic">{help}</span>}
    </div>
  )
}

export default InputWrapper

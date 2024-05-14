import type { BaseEditorProps } from './types'
import React, { forwardRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'

const BaseEditor: React.ForwardRefRenderFunction<Editor, BaseEditorProps> = (
  { apiKey, init, onEditorChange, onValueChange, onInit, ...props },
  ref,
) => {
  const [active, setActive] = useState(false)
  const { height = 400, ...defaultInit } = init || {}

  const handleChange: typeof onEditorChange = (a, editor) => {
    onEditorChange?.(a, editor)
    onValueChange?.(a)
  }

  const handleInit: typeof onInit = (...args) => {
    onInit?.(...args)
    setActive(true)
  }

  return (
    <div className="relative" style={{ height }}>
      <Editor
        ref={ref}
        apiKey={apiKey}
        init={{
          plugins: 'link lists table',
          toolbar: 'undo redo | blocks | bold italic underline strikethrough | link table align numlist bullist | removeformat',
          tinycomments_mode: 'embedded',
          skin_url: '/tinymce-theme',
          menubar: false,
          branding: false,
          height,
          ...defaultInit,
        }}
        onEditorChange={handleChange}
        onInit={handleInit}
        {...props}
      />
      <div
        className={twMerge(
          'absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-gray-200 transition-all',
          active && 'pointer-events-none opacity-0',
        )}
      >
        <Spinner className="h-20 w-20 text-primary-600" strokeWidth={1} />
      </div>
    </div>
  )
}

export default forwardRef(BaseEditor)

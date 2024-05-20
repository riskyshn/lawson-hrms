// IMPORTANT: Ensure the register module is imported first.
import '@/register'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProviders as JSCProvider } from 'jobseeker-ui'
import Boot from '@/Boot'
import { ReloadPrompt } from '@/components'
import router from '@/router'
import { ContextProviders } from './contexts'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProviders>
      <JSCProvider>
        <Boot>
          <RouterProvider router={router} />
          <ReloadPrompt />
        </Boot>
      </JSCProvider>
    </ContextProviders>
  </React.StrictMode>,
)

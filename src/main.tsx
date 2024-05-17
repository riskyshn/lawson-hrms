// IMPORTANT: Ensure the register module is imported first.
import '@/register'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProviders } from 'jobseeker-ui'
import Boot from '@/Boot'
import { ReloadPrompt } from '@/components'
import router from '@/router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProviders>
      <Boot>
        <RouterProvider router={router} />
        <ReloadPrompt />
      </Boot>
    </ContextProviders>
  </React.StrictMode>,
)

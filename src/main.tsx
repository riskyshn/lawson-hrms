// IMPORTANT: Ensure the register module is imported first.
import './register'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProviders } from '@jshrms/ui'
import Boot from './Boot'
import router from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProviders>
      <Boot>
        <RouterProvider router={router} />
      </Boot>
    </ContextProviders>
  </React.StrictMode>,
)

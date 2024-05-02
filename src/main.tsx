import { Provider } from 'jobseeker-ui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import Boot from './Boot'
import { MediaPreviewerProvider } from './contexts/MediaPreviewerContext'
import router from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <MediaPreviewerProvider>
        <Boot>
          <RouterProvider router={router} />
        </Boot>
      </MediaPreviewerProvider>
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'jobseeker-ui'
import Boot from './Boot'
import router from './router'
import './index.css'
import { ImagePreviewerProvider } from './contexts/ImagePreviewerContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ImagePreviewerProvider>
        <Boot>
          <RouterProvider router={router} />
        </Boot>
      </ImagePreviewerProvider>
    </Provider>
  </React.StrictMode>,
)

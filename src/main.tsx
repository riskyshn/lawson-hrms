import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'jobseeker-ui'
import { routes } from './routes'
import Boot from './Boot'
import './fontsource'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <Boot>
        <RouterProvider router={routes} />
      </Boot>
    </Provider>
  </React.StrictMode>,
)

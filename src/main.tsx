import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'jobseeker-ui'
// import Router from './Router'
import './fontsource'
import './index.css'
import { routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      {/* <Router /> */}
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)

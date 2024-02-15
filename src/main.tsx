import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'jobseeker-ui'
import Router from './Router'
import './fontsource'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

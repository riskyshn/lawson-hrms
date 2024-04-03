import { Provider } from 'jobseeker-ui'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Boot from './Boot'
import { ImagePreviewerProvider } from './contexts/ImagePreviewerContext'
import './index.css'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <ImagePreviewerProvider>
      <Boot>
        <RouterProvider router={router} />
      </Boot>
    </ImagePreviewerProvider>
  </Provider>,
)

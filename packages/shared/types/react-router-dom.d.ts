import 'react-router-dom'

declare module 'react-router-dom' {
  interface IndexRouteObject {
    name?: string
  }

  interface NonIndexRouteObject {
    name?: string
  }
}

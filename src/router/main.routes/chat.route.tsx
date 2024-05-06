import type { RouteObject } from 'react-router-dom'
import ChatPage from '@/pages/chat/index/ChatPage'

const chatRoute: RouteObject = {
  element: <ChatPage />,
  name: 'Chat',
  path: 'chat',
}

export default chatRoute

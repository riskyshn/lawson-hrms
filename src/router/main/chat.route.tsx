import ChatPage from '@/pages/chat/index/ChatPage'
import type { RouteObject } from 'react-router-dom'

const chatRoute: RouteObject = {
  path: 'chat',
  element: <ChatPage />,
  name: 'Chat',
}

export default chatRoute

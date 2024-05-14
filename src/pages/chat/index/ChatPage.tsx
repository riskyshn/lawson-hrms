import React, { useEffect, useMemo, useRef } from 'react'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from '@jshrms/ui'
import { SearchIcon, SendIcon } from 'lucide-react'

const ChatPage: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Robert Brown' },
    { id: 6, name: 'Sophia Taylor' },
    { id: 7, name: 'David Wilson' },
    { id: 8, name: 'Isabella Martinez' },
    { id: 9, name: 'William Anderson' },
    { id: 10, name: 'Ava White' },
  ]

  const messages = useMemo(() => {
    return [
      { sender: 'other', text: 'Hello, how can I help you?' },
      { sender: 'user', text: 'Hi! I have a question.' },
      { sender: 'other', text: 'Sure, what is your question?' },
      { sender: 'user', text: 'Can you tell me more about your product?' },
      { sender: 'user', text: 'Can you tell me more about your service too?' },
      {
        sender: 'other',
        text: "Of course! Our product offers a wide range of features, including A, B, and C. It's designed to help you achieve your goals efficiently and effectively.",
      },
      { sender: 'user', text: 'That sounds great! Can you explain feature A in more detail?' },
      { sender: 'other', text: 'Certainly! Feature A allows you to do X, Y, and Z, providing you with great flexibility and control.' },
      { sender: 'user', text: 'Wow, that sounds really useful! How do I get started?' },
      {
        sender: 'other',
        text: "You can get started by signing up on our website. Once you've registered, you'll have access to all the features right away.",
      },
    ]
  }, [])

  const chatBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Chat' }]} />
      <Container className="mt-4 flex flex-row gap-3">
        <div className="w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Input
                  className="m-0 mt-1 w-full"
                  inputClassName="peer pl-7"
                  placeholder="Search..."
                  rightChild={
                    <SearchIcon
                      className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                      size={16}
                    />
                  }
                  type="text"
                />
              </div>
            </CardHeader>
            <CardBody className="flex h-[68.8vh] flex-col overflow-scroll">
              {users.map((user, index) => (
                <div className="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-100" key={index}>
                  <Avatar className="bg-primary-100 text-primary-700" name={user.name} size={38} />
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="w-3/4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={'John Doe'} size={38} />
                <div>
                  <span className="block font-semibold">{'John Doe'}</span>
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex h-[60vh] flex-col overflow-scroll" ref={chatBodyRef}>
              {messages.map((message, index) => (
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`} key={index}>
                  <div
                    className={`rounded-lg p-2 text-sm ${message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </CardBody>
            <CardFooter className="flex rounded-lg bg-white">
              <Input className="flex-grow" placeholder="Type your message..." type="text" />
              <Button className="ml-2" color="primary" variant="default">
                <SendIcon />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default ChatPage

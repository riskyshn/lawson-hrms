import React, { createContext, useState } from 'react'

// Define types for event name and data
type EventName = string
type EventData = any

// Define type for the event callback
type EventCallback = (data: EventData) => void

// Define the type for the events object
type Events = {
  [eventName: string]: EventCallback[]
}

// Create a Pub-Sub Context
const PubSubContext = createContext<{
  subscribe: (eventName: EventName, callback: EventCallback) => () => void
  publish: (eventName: EventName, data: EventData) => void
}>({
  subscribe: () => () => {},
  publish: () => {},
})

// Provider Component
export const PubSubProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [events, setEvents] = useState<Events>({})

  // Subscribe function
  const subscribe = (eventName: EventName, callback: EventCallback) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: [...(prevEvents[eventName] || []), callback],
    }))

    // Return a function to unsubscribe
    return () => {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [eventName]: prevEvents[eventName]?.filter((cb) => cb !== callback) || [],
      }))
    }
  }

  // Publish function
  const publish = (eventName: EventName, data: EventData) => {
    const eventCallbacks = events[eventName] || []
    eventCallbacks.forEach((callback) => callback(data))
  }

  // Context value
  const contextValue = { subscribe, publish }

  return <PubSubContext.Provider value={contextValue}>{children}</PubSubContext.Provider>
}

export const usePubSub = () => React.useContext(PubSubContext)

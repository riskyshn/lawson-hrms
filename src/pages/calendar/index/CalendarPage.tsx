import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import Modal from '../components/Modal'

const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleEventClick = (info: any) => {
    // Accessing extended properties
    const event = info.event
    const extendedProps = event.extendedProps || {}

    setSelectedEvent({
      title: event.title,
      start: event.start ? event.start.toISOString() : '',
      end: event.end ? event.end.toISOString() : '',
      guest: extendedProps.guest || [],
      description: extendedProps.description || '',
      location: extendedProps.location || '',
      timezone: extendedProps.timezone || '',
    })

    setIsModalOpen(true)
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Calendar' }]} />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          events={[
            {
              title: 'Morning Meeting',
              start: '2024-04-17T09:00:00',
              end: '2024-04-17T10:00:00',
              extendedProps: {
                guest: ['abc@gmail.com'],
                description:
                  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam itaque non delectus ex a exercitationem suscipit tempore vitae dolorem vero labore aliquid dicta officiis repellendus fuga, cum incidunt quas dignissimos.',
                location: 'JH Office',
                timezone: 'GMT+7',
              },
            },
            {
              title: 'Lunch Break',
              start: '2024-04-17T12:00:00',
              end: '2024-04-17T13:00:00',
              extendedProps: {
                guest: ['abc@gmail.com'],
                description: 'Lorem ipsum dolor sit amet consectetur...',
                location: 'JH Office',
                timezone: 'GMT+7',
              },
            },
            {
              title: 'Afternoon Meeting',
              start: '2024-04-17T14:00:00',
              end: '2024-04-17T15:00:00',
              extendedProps: {
                guest: ['abc@gmail.com'],
                description: 'Lorem ipsum dolor sit amet consectetur...',
                location: 'JH Office',
                timezone: 'GMT+7',
              },
            },
          ]}
          eventClick={handleEventClick}
        />

        <Modal show={isModalOpen} onClose={closeModal} items={selectedEvent} />
      </Container>
    </>
  )
}

export default CalendarPage

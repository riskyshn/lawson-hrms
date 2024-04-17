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
    setSelectedEvent(info.event)
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
            },
            {
              title: 'Lunch Break',
              start: '2024-04-17T12:00:00',
              end: '2024-04-17T13:00:00',
            },
            {
              title: 'Afternoon Meeting',
              start: '2024-04-17T14:00:00',
              end: '2024-04-17T15:00:00',
            },
          ]}
          eventClick={handleEventClick}
        />

        <Modal
          show={isModalOpen}
          onClose={closeModal}
          items={
            selectedEvent
              ? {
                  title: selectedEvent.title,
                  start: selectedEvent.start
                    ? `${selectedEvent.start.toLocaleDateString()} ${selectedEvent.start.toLocaleTimeString()}`
                    : '',
                  end: selectedEvent.end ? `${selectedEvent.end.toLocaleDateString()} ${selectedEvent.end.toLocaleTimeString()}` : '',
                }
              : null
          }
        />
      </Container>
    </>
  )
}

export default CalendarPage

import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import Modal from './components/Modal'
import { fetchCalendar } from '@/services/dashboard.service'

export const Component: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [calendarEvents, setCalendarEvents] = useState<any[]>([])
  const calendarRef = useRef<FullCalendar | null>(null)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const dateParam = queryParams.get('date')

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const handleEventClick = (info: any) => {
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

  const handleDatesSet = (dateInfo: any) => {
    const { startStr, endStr } = dateInfo

    const load = async (startStr: string, endStr: string) => {
      try {
        const data = await fetchCalendar({
          start_date: startStr.substring(0, 10),
          end_date: endStr.substring(0, 10),
        })

        const mappedEvents = data.content.map((event: IDashboardSchedule) => ({
          title: event.name,
          start: event.startedAt,
          end: event.endedAt,
          extendedProps: {
            guest: event.guests || [],
            description: event.description || '',
            location: event.location || '',
            timezone: event.timezone || '',
          },
        }))
        setCalendarEvents(mappedEvents)
      } catch (e) {
        console.error('Error fetching calendar events:', e)
      }
    }

    load(startStr, endStr)
  }

  useEffect(() => {
    if (calendarRef.current && dateParam) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.gotoDate(dateParam)
    }
  }, [dateParam])

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Calendar' }]} />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          events={calendarEvents}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
        />

        <Modal show={isModalOpen} onClose={closeModal} items={selectedEvent} />
      </Container>
    </>
  )
}

Component.displayName = 'CalendarPage'

export default Component

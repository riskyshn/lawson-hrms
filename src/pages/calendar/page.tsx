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

  const [tooltipInstance, setTooltipInstance] = useState<any>('')

  const handleMouseEnter = (info: any) => {
    if (info.event.extendedProps.description) {
      setTooltipInstance(
        <div
          className="absolute z-10 rounded-lg border border-gray-900 bg-gray-700 px-2 py-1 text-xs leading-tight text-white"
          style={{
            left: info.el.getBoundingClientRect().left + window.scrollX,
            top: info.el.getBoundingClientRect().top + window.scrollY - 30,
          }}
        >
          {info.event.title}
        </div>,
      )
    }
  }

  const handleMouseLeave = () => {
    setTooltipInstance(null)
  }

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
            left: 'prevButton,nextButton todayButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          events={calendarEvents}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
          }}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
          customButtons={{
            prevButton: {
              text: '<',
              click: function () {
                calendarRef.current?.getApi().prev()
              },
            },
            nextButton: {
              text: '>',
              click: function () {
                calendarRef.current?.getApi().next()
              },
            },
            todayButton: {
              text: 'Today',
              click: function () {
                calendarRef.current?.getApi().today()
              },
            },
            dayGridMonth: {
              text: 'Month',
              click: function () {
                calendarRef.current?.getApi().changeView('dayGridMonth')
              },
            },
            timeGridWeek: {
              text: 'Week',
              click: function () {
                calendarRef.current?.getApi().changeView('timeGridWeek')
              },
            },
            timeGridDay: {
              text: 'Day',
              click: function () {
                calendarRef.current?.getApi().changeView('timeGridDay')
              },
            },
            listMonth: {
              text: 'List',
              click: function () {
                calendarRef.current?.getApi().changeView('listMonth')
              },
            },
          }}
        />
        {tooltipInstance}

        <Modal show={isModalOpen} onClose={closeModal} items={selectedEvent} />
      </Container>

      <style>
        {`
        .fc .fc-button-primary {
          --tw-bg-opacity: 1;
          background-color: rgb(37 99 235 / var(--tw-bg-opacity)) !important;
          color: white !important;
          border-color: rgb(37 99 235 / var(--tw-bg-opacity)) !important;
        }
        .fc .fc-daygrid-day.fc-day-today {
          --tw-bg-opacity: 1;
          background-color: rgb(219 234 254 / var(--tw-bg-opacity));
        }
        .fc .fc-timegrid-col.fc-day-today {
          --tw-bg-opacity: 1;
          background-color: rgb(219 234 254 / var(--tw-bg-opacity));
        }
        .fc .fc-daygrid-event-harness {
          cursor: pointer;
        }
      `}
      </style>
    </>
  )
}

Component.displayName = 'CalendarPage'

export default Component

import type { IDashboardSchedule, IEvent, IEventRefiners } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { fetchCalendar } from '@/services/dashboard.service'
import Modal from './components/Modal'

export const Component: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>()
  const [calendarEvents, setCalendarEvents] = useState<IEventRefiners[]>([])
  const calendarRef = useRef<FullCalendar | null>(null)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const dateParam = queryParams.get('date')

  const [tooltipInstance, setTooltipInstance] = useState<React.ReactNode>('')

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
      description: extendedProps.description || '',
      end: event.end ? event.end.toISOString() : '',
      guest: extendedProps.guest || [],
      location: extendedProps.location || '',
      start: event.start ? event.start.toISOString() : '',
      timezone: extendedProps.timezone || '',
      title: event.title,
      linkGmeet: extendedProps.linkGmeet || '',
    })

    setIsModalOpen(true)
  }

  const handleDatesSet = (dateInfo: any) => {
    const { endStr, startStr } = dateInfo

    const load = async (startStr: string, endStr: string) => {
      try {
        const data = await fetchCalendar({
          end_date: endStr.substring(0, 10),
          start_date: startStr.substring(0, 10),
        })

        const mappedEvents = data.content.map((event: IDashboardSchedule) => ({
          end: event.endedAt,
          extendedProps: {
            description: event.description || '',
            guest: event.guests || [],
            location: event.location || '',
            timezone: event.timezone || '',
            linkGmeet: event.linkGmeet,
          },
          start: event.startedAt,
          title: event.name,
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
          customButtons={{
            dayGridMonth: {
              click: function () {
                calendarRef.current?.getApi().changeView('dayGridMonth')
              },
              text: 'Month',
            },
            listMonth: {
              click: function () {
                calendarRef.current?.getApi().changeView('listMonth')
              },
              text: 'List',
            },
            nextButton: {
              click: function () {
                calendarRef.current?.getApi().next()
              },
              text: '>',
            },
            prevButton: {
              click: function () {
                calendarRef.current?.getApi().prev()
              },
              text: '<',
            },
            timeGridDay: {
              click: function () {
                calendarRef.current?.getApi().changeView('timeGridDay')
              },
              text: 'Day',
            },
            timeGridWeek: {
              click: function () {
                calendarRef.current?.getApi().changeView('timeGridWeek')
              },
              text: 'Week',
            },
            todayButton: {
              click: function () {
                calendarRef.current?.getApi().today()
              },
              text: 'Today',
            },
          }}
          datesSet={handleDatesSet}
          eventClick={handleEventClick}
          eventMouseEnter={handleMouseEnter}
          eventMouseLeave={handleMouseLeave}
          eventTimeFormat={{
            hour: 'numeric',
            meridiem: 'short',
            minute: '2-digit',
          }}
          events={calendarEvents}
          headerToolbar={{
            center: 'title',
            left: 'prevButton,nextButton todayButton',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          ref={calendarRef}
        />
        {tooltipInstance}

        <Modal items={selectedEvent} onClose={closeModal} show={isModalOpen} />
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

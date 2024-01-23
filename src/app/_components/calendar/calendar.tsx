/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { api } from '@/trpc/react'
import { useEffect, useState } from 'react'


export const CalendaFull = () => {

    const [intitalEvents, setEvents] = useState<{ title: string; start: Date; end: Date }[]>()
    const { data } = api.calendar.getCalendar.useQuery()

    useEffect(() => {
        const events: { title: string; start: Date; end: Date }[] = []
        if (data) {
            data.forEach((item: { title: any; description: any; startDate: string | number | Date; endDate: string | number | Date }) => {
                events.push({
                    title: `${item.title}\n ${item.description}`,
                    start: new Date(item.startDate),
                    end: new Date(item.endDate),
                })
            })
            setEvents(() => events)

        }
    }, [data])

    useEffect(() => {
        console.log("Data", intitalEvents)
    }, [intitalEvents])

    if (intitalEvents)
        return (
            <FullCalendar
                height={700}
                expandRows={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                nowIndicator={false}
                editable={false}
                selectable={false}
                selectMirror={false}
                initialEvents={intitalEvents ? intitalEvents : [{ title: 'example', start: new Date(2024, 0, 13), end: new Date(2024, 0, 18) }]}
                dayMaxEventRows={2}
                dayMaxEvents={2}
            />


        )
    return (
        <><h1>Hello</h1></>
    )
}

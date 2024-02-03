import { CalendaFull } from "@/app/_components/calendar/calendar";
import { GoogleCalendar } from "@/app/_components/calendar/google-calendar";



export default function CalendarPage() {

    return (
        <section className="h-fit">
            <GoogleCalendar />
        </section>
    );
}
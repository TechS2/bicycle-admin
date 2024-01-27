import { SessionSet } from "../_components/calendar/session-set";




export default  function CalendarPage({ searchParams }: { searchParams: { code: string } }) {

    return (
        <section className="h-fit">
            <SessionSet token={searchParams.code}/>
        </section>
    );
}
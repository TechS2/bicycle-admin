import { api } from "@/trpc/server"
import { redirect } from "next/navigation"



export default async function TestingPage() {
    const url = await api.calendar.googleOAuth.query()
    redirect(url)
}

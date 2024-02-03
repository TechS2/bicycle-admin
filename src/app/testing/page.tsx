import { api } from "@/trpc/server"
import { redirect } from "next/navigation"
import { CookiesSetting } from "../_components/testing/set-cookies"



export default async function TestingPage() {
    const url = await api.calendar.googleOAuth.query()
    redirect(url)

    // return (
    //     <CookiesSetting />
    // )
}

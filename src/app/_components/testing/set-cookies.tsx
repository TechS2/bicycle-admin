'use client'

import { api } from "@/trpc/react"

export const CookiesSetting = ()=>{

    api.calendar.getInfoFromRefreshToken.useQuery()
    return (
        <h1>Testing Cookies</h1>
    )
}
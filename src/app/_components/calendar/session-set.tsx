/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { api } from "@/trpc/react"
import { useEffect } from "react"
import { getCookie, getCookies, setCookie } from 'cookies-next';
import Link from "next/link";
import { create } from "@/app/_actions/action";



export const SessionSet = ({ token }: { token: string }) => {

    const { data } = api.calendar.getUserInfo.useQuery({ cookie: token })
        useEffect(() => {
            if (data) {
                create(data)
                localStorage.setItem('google_token', JSON.stringify(data))
            }
        }, [data])
    // if (tokens) {
    //     const { data } = api.calendar.createEvent.useQuery({ tokens: tokens })
    //     console.log(data)
    // }


    return (
        <>
            <h1>Hello</h1>
            <Link href={"/testing"}>Testing</Link>
        </>
    )
}

'use server'
import { cookies } from "next/headers";

export async function create(code: any) {

    const response = cookies().set('calendar_token', JSON.stringify(code), {
        secure: true,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        priority: 'medium',
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    })

    console.log(response)
}



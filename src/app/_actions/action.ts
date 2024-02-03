'use server'
import { cookies } from "next/headers";

export async function create(googleToken: GoogleTokenProp) {

    const entries = Object.entries(googleToken);
    for (let [key, value] of entries) {
        console.log(key)
        if (key != 'cg_expiry_date')
            cookies().set(key, value.toString(), {
                secure: true,
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                priority: 'medium',
                expires: key != 'cg_refresh_token' ? +googleToken.cg_expiry_date : new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
            })

    }
}



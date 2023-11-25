'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import {FaRightFromBracket} from 'react-icons/fa6'
export const LogOut = () => {

    const router = useRouter()
    const logouthandler = async () =>{
        const data = await signOut({redirect: false, callbackUrl: "/"})
        router.push(data.url)
    }
    return (
        <button onClick={() => logouthandler() } className=" border-2 rounded-md font-sans flex gap-2 p-2">
           <FaRightFromBracket className="my-1" /> Log out
        </button>
    )
}
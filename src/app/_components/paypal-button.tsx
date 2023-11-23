'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { BsPaypal } from "react-icons/bs"
import { api } from "@/trpc/react"
import { useRouter } from "next/navigation"

export const PayPalButton = () => {

    const session = useSession()
    const router  = useRouter()
    const [isConnect, setConnect] = useState<boolean>(false)

    console.log(session)
    
    if (!session)
        router.push('/')

    const { data } = api.paypal.getStatus.useQuery({email:session.data?.user.email})

    const { mutate } = api.paypal.connectToPayPal.useMutation({
        onSuccess: (data) => {
            window.location.href = data
        }     
    })

    useEffect(() => {
        if (data)
            setConnect(() => true)
    }, [data])
    
    const connect = () => {
        mutate()
    }

    return (
        <button className="bg-green-700 hover:bg-white hover:text-green-700 hover:border-2 flex text-white text-3xl p-3 rounded-lg" onClick={connect} disabled={isConnect?true:false}>
            <BsPaypal className="px-1" />
            <span className="px-2">
                {isConnect? "Connected":"Connect"}
            </span>
        </button>
    )
}
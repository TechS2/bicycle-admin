'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { BsPaypal } from "react-icons/bs"
import { api } from "@/trpc/react"

export const PayPalButton = () => {

    const session = useSession()
    const [isconnect, setConnect] = useState<boolean>(false)

    const { data } = api.paypal.getStatus.useQuery()

    const { mutate } = api.paypal.connectToPayPal.useMutation({
        onSuccess: (data) => {
            window.location.href = data
        }     
    })

    useEffect(() => {

        if (data)
            setConnect(() => true)
    }, [data])

    if (!session)
        return (<>Cannot Access This Page</>)

    const connect = () => {
        mutate()
    }

    return (
        <button className="bg-green-700 hover:bg-white hover:text-green-700 hover:border-2 flex text-white text-3xl p-3 rounded-lg" onClick={connect} disabled={isconnect?true:false}>
            <BsPaypal className="px-1" />
            <span className="px-2">
                {isconnect? "Connected":"Connect"}
            </span>
        </button>
    )
}
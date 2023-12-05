'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { BsPaypal } from "react-icons/bs"
import { api } from "@/trpc/react"
import { useRouter } from "next/navigation"

export const PayPalButton = () => {

    const session = useSession()
    const router = useRouter()
    const [isConnect, setConnect] = useState<boolean>(false)

    if (!session)
        router.push('/')

    const { data } = api.paypal.getStatus.useQuery({ email: session.data?.user.email })

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
        <div className="flex flex-col">
            <button className="bg-green-700 hover:bg-white hover:text-green-700 border-2 disabled:bg-green-700 disabled:text-white flex justify-evenly text-white text-xl  rounded-lg p-2" onClick={connect} disabled={isConnect ? true : false}>
                <BsPaypal className=" w-8 h-8" />
                <span >
                    {isConnect ? "Connected" : "Connect"}
                </span>
            </button>
            {
               isConnect &&  <small className="text-gray-900 font-bold">Already connected with paypal</small>
            }
            
        </div>

    )
}
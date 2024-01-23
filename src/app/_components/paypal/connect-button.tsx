'use client'
import { api } from "@/trpc/react"


export const ConnectButton = () => {

    const { mutate } = api.paypal.connectToPayPal.useMutation({
        onSuccess: (data) => {
            window.location.href = data
        }
    })

    const connect = () => {mutate()}
    return (
        <button className="bg-green-700 hover:bg-white hover:text-green-700 border-2 disabled:bg-green-700 disabled:text-white flex justify-evenly text-white text-xl  rounded-lg p-2" onClick={connect} >
                Connect
        </button>
    )
}
'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { api } from "@/trpc/react"
import { useRouter } from "next/navigation"
import { DisconnectButton } from "./disconnect-button"
import { ConnectButton } from "./connect-button"

export const PayPalButton = () => {

    const session = useSession()
    const router = useRouter()
    const [isConnect, setConnect] = useState<boolean>()

    if (!session)
        router.push('/')

    const { data } = api.paypal.getStatus.useQuery({ email: session.data?.user.email })

    useEffect(() => {
        if (data)
            setConnect(() => true)
    }, [data])

    return (
        <div className="flex justify-center align-middle items-center">
            {
                isConnect && isConnect ?<DisconnectButton/>:<ConnectButton/>
            }
        </div>
    )
}
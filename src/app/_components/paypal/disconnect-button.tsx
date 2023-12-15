import { api } from "@/trpc/react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"


export const DisconnectButton = () => {

    const session = useSession()
    const router = useRouter()
    const {mutate} = api.paypal.deActivateAccount.useMutation({
        onSuccess:()=>{
            onClose()
            router.refresh()
        }
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    const deActivateAccount = ()=>{
        const sessionEmail = session.data?.user.email
        if(sessionEmail)
            mutate({email:sessionEmail})    
    }
    return (
        <>
            <button className="text-white text-lg bg-red-600 p-2 rounded-md" onClick={onOpen}>
                Disconnect
            </button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' className="text-red-600">
                            Disconnect Account
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Disconnecting your PayPal account will prevent you from offering PayPal services and products on your website. Do you wish to continue?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <button className="text-white text-base bg-gray-600 p-2 rounded-md mx-2" ref={cancelRef} onClick={onClose}>
                                Cancel
                            </button>
                            <button className="text-white text-base bg-red-600 p-2 rounded-md" onClick={()=>deActivateAccount()}>
                                Confirm
                            </button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
import { api } from "@/trpc/react"
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { useDisclosure } from "@nextui-org/react"
import { useRef, useState } from "react"

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export const RefundOrder = ({ captureId }: { captureId: string }) => {

    const [alert, setAlert] = useState<boolean>(false)
    const { mutate } = api.paypal.makeRefund.useMutation({
        onSuccess: () => {
            onClose()
        },
        onError: () => {
            onClose()
            setAlert(()=>true)
            setTimeout(()=>{
                    setAlert(()=>false)
            },3000)
        }
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)
    const Refund = (captureId: string) => mutate({ captureId: captureId })
    return (
        <>
            <button className="bg-gray-900 text-white p-2 rounded-md" onClick={onOpen}>
                Refund
            </button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Refund Order?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to refund the order? You can't undo this.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <button className="bg-green-900 text-white p-2 rounded-md mx-10" ref={cancelRef} onClick={onClose}>
                            Cancel
                        </button>
                        <button className="bg-red-900 text-white p-2 rounded-md" onClick={() => Refund(captureId)}>
                            Refund
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
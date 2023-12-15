import { Badge } from "@chakra-ui/react"

export const Status = ({ status }: { status: boolean }) => {

    return (
        <>
            {
                status ? <Badge colorScheme='green'>Active</Badge> :
                    <Badge colorScheme='red'>InActive</Badge>
            }
        </>
    )
}
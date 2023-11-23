import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"




export default  async function OnSuccess({searchParams}:{searchParams:{merchantId:string,merchantIdInPayPal:string}}) {

    const session = await getServerAuthSession()
    
    if(!session)
        return <>Session Error</>

    await api.paypal.createSellerInfo.mutate({trackingId:searchParams.merchantId.toString(),merchantId:searchParams.merchantIdInPayPal.toString(),email:session.user.email})
    
    return (
        <div>
            <h1>Successlly onboading will change ui later</h1>
            <h1>{searchParams.merchantId.toString()} {searchParams.merchantIdInPayPal.toString()}</h1>
        </div>
    )
}

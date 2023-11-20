import { api } from "@/trpc/server"


export default  function OnSuccess({searchParams}:{searchParams:{merchantId:string,merchantIdInPayPal:string}}) {

    // await api.paypal.updateSellerInfo.mutate({trackingId:searchParams.merchantId.toString(),merchantId:searchParams.merchantIdInPayPal.toString()})
    return (
        <div>
            <h1>Successlly onboading will change ui later</h1>
            <h1>{searchParams.merchantId.toString()} {searchParams.merchantIdInPayPal.toString()}</h1>
        </div>
    )
}

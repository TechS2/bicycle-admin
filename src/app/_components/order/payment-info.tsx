import { addEuroSign } from "@/utils"


export const PaymenInfo = ({captureId,paymentEmail,personalEmail,amount}:{captureId:string | undefined,paymentEmail:string | undefined,personalEmail:string | undefined,amount:number | undefined}) => {
    return (
        <div className="flex  flex-wrap justify-between font-sans text-gray-900 bg-white font-bold p-4 rounded-md">
            <div className="flex align-middle items-center gap-2">
                <div className="text-lg font-bold">Order No.:</div>
                <div className="text-base font-medium">{captureId}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-lg font-bold">PayPal Email:</div>
                <div className="text-base font-medium">{paymentEmail}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-lg font-bold">Customer Email:</div>
                <div className="text-base font-medium">{personalEmail}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-lg font-bold">Amount :</div>
                <div className="text-base font-bold ">{addEuroSign(String(amount))}</div>
            </div>
        </div>

    )
}
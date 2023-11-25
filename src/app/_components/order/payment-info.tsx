

export const PaymenInfo = ({captureId,paymentEmail,personalEmail,amount}:{captureId:string | undefined,paymentEmail:string | undefined,personalEmail:string | undefined,amount:number | undefined}) => {
    return (
        <div className="flex  flex-wrap justify-between font-sans text-gray-900 bg-white font-bold p-4 rounded-md shadow-md">
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Capture Id(PayPal) :</div>
                <div className="text-sm font-medium">{captureId}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Payment Email(PayPal) :</div>
                <div className="text-sm font-medium">{paymentEmail}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Personal Email :</div>
                <div className="text-sm font-medium">{personalEmail}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Amount :</div>
                <div className="text-sm font-medium">{amount}</div>
            </div>
        </div>

    )
}
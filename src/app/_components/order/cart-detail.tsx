

export const CartDetail = ({cartId,cartLength}:{cartId:number|undefined,cartLength:number|undefined}) => {
    return (
        <div className="flex  flex-wrap justify-between font-sans text-gray-900 bg-white font-bold p-4 rounded-md shadow-md">
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Cart Id :</div>
                <div className="text-sm font-medium">{cartId}</div>
            </div>
            <div className="flex align-middle items-center gap-2">
                <div className="text-base font-bold">Total Items:</div>
                <div className="text-sm font-medium">{cartLength}</div>
            </div>
        </div>
    )
}
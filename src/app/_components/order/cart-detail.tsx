

export const CartDetail = ({cartLength}:{cartLength:number|undefined}) => {
    return (
        <div className="flex  flex-wrap justify-between font-sans text-gray-900 bg-white font-bold p-4 rounded-md">
            <div className="flex align-middle items-center gap-2">
                <div className="text-lg font-bold">Total Items:</div>
                <div className="text-base font-medium">{cartLength}</div>
            </div>
        </div>
    )
}
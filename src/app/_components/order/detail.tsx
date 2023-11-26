import { addEuroSign } from "@/utils";
import Image from "next/image";
import { SubDetail } from "./sub-detail";

export const Detail = ({ item }: { item: any }) => (
    <article className="col-span-1 flex-col gap-5 border-2 border-gray-200 p-3 rounded-xl hover:cursor-pointer hover:shadow-md" key={item.id}>
        <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
                <SubDetail label="Quantity" value={item.quantity} />
                <SubDetail label="Rental Days" value={item.dif} />
                <SubDetail label="Start Date" value={item.startDate} />
                <SubDetail label="End Date" value={item.endDate} />
            </div>
            <div className="col-span-1">
                <SubDetail label="Size (if any)" value={item.size} />
                <SubDetail label="Product Name" value={item.Product.name} />
                <SubDetail label="Product Code" value={item.Product.code} />
                <SubDetail label="Product Price" value={addEuroSign(item.Product.price)} />
            </div>
        </div>
        <div className="flex justify-center">
            <Image src={`${item.Product.image}`} width={200} height={100} alt={`${item.Product.name}_image`} />
        </div>
    </article>
);

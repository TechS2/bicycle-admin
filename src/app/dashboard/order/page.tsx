import { OrderTable } from "@/app/_components/tables/orders-table";

export default function Order() {

    return (
        <section className="flex flex-col gap-3">
            <h1 className="text-gray-900 bg-white text-2xl font-bold p-4 rounded-md shadow-md">Order Details</h1>
            <OrderTable />
        </section>
    )
}
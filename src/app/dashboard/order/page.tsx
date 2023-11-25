import { Heading } from "@/app/_components/section-heading";
import { OrderTable } from "@/app/_components/tables/orders-table";

export default function Order() {

    return (
        <section className="flex flex-col gap-3">
            <Heading  title="Orders"/>
            <OrderTable />
        </section>
    )
}
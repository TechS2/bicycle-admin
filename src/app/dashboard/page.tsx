import { ProductTable } from "../_components/tables/products-table";
import { TopBar } from "../_components/top-bar";

export default  function DashboardPage(){
    

    return (
       <section className="flex flex-col gap-3">
            <h1 className="text-gray-900 text-2xl font-bold">Product Details</h1>
            <TopBar/>
            <ProductTable/>
       </section>
    )
}

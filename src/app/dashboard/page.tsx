import { ProductTable } from "../_components/tables/products-table";
import { TopBar } from "../_components/top-bar/top-bar";

export default  function DashboardPage(){
    
    return (
       <section className="flex flex-col gap-3">
            <h1 className="text-gray-900 bg-white text-2xl font-bold p-4 rounded-md shadow-md">Product Details</h1>
            <TopBar/>
            <ProductTable/>
       </section>
    )
}

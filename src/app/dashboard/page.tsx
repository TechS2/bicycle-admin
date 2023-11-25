import { Heading } from "../_components/section-heading";
import { ProductTable } from "../_components/tables/products-table";
import { TopBar } from "../_components/top-bar/top-bar";

export default  function DashboardPage(){
    
    return (
       <section className="flex flex-col gap-3">
            <Heading title="Products"/>
            <TopBar/>
            <ProductTable/>
       </section>
    )
}

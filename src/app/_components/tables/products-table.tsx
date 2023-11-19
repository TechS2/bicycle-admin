import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/trpc/server"
import { Product } from "@prisma/client"
import Image from "next/image"


export const ProductTable = async () => {

    const products :Product[]=  await api.product.getAllProducts.query()
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow className="text-xl font-bold text-gray-900">
                    <TableHead>Id</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Size</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product:Product) => (
                    <TableRow key={product.id} className="text-lg">
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.code}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Image src={product.image} width={100} height={100} alt="product image"/>
                        </TableCell>
                        <TableCell>{product.size}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
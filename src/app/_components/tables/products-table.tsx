'use client';

import { FaPowerOff, FaTrashCan } from 'react-icons/fa6';
import Image from 'next/image';
import { addEuroSign, addInches } from '@/utils';
import { api } from '@/trpc/react';
import { Status } from '../status';
import { useRouter } from 'next/navigation';
import { EditProduct } from '../modal/edit-product';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Product } from '@prisma/client';


export const ProductTable = () => {
    
    const router = useRouter()
    const { data } = api.product.getAllProducts.useQuery()
    const { mutate } = api.product.deleteProduct.useMutation({
        onSuccess: () => {
            window.location.reload()
        },
        onError: () => {
            //TODO: Toast
        }
    })
    const toogler = api.product.toogleStatus.useMutation({
        onSuccess: () => {
            //TODO: Toast
            window.location.reload()
        },
        onError: () => {
            //TODO: Toast
        }
    })


    const deleteProduct = (productId: number) => mutate({ productId: productId })

    const Toogle = (productId: number, status: boolean) => toogler.mutate({ productId: productId, status: status })

    const imageTemplate = (row: Product) => (
        <div className="w-[5rem] h-[4rem]">
            <Image
                src={row.image}
                alt="Product image"
                width={250}
                height={250}
                className="w-full h-full object-contain"
            />
        </div>
    )

    const deleteTemplate = (row: Product) => (
        <button
            className="text-red-600 border-2 border-red-600 rounded-full p-2"
            onClick={() => deleteProduct(row.id)}
        >
            <FaTrashCan />
        </button>
    )
    const editTemplate = (row: Product) => (<EditProduct product={row} />)
    const toggleTemplate = (row: Product) => (
        <button
            className="text-yellow-600 border-2 border-yellow-600 rounded-full p-2"
            onClick={() => Toogle(row.id, row.active)}
        >
            <FaPowerOff />
        </button>
    )
    const currencyTemplate = (row: Product) => addEuroSign(row.price)
    const statusTemplate = (row: Product) => <Status status={row.active} />
    const sizeTemplate = (row: Product) => addInches(row.size)

    return (
        <DataTable  value={data} dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
            <Column field="image" header="Image" body={imageTemplate} ></Column>
            <Column field="name" header="Name" sortable ></Column>
            <Column field="code" header="SKU" sortable ></Column>
            <Column field="price" header="Price" sortable body={currencyTemplate} ></Column>
            <Column field="active" header="Status" sortable body={statusTemplate} ></Column>
            <Column field="size" header="Size" body={sizeTemplate} ></Column>
            <Column header="Delete" body={deleteTemplate}></Column>
            <Column header="Edit" body={editTemplate}></Column>
            <Column header="Active/Inactive" body={toggleTemplate}></Column>
        </DataTable>
    );
};

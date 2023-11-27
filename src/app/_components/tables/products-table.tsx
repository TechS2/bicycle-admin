'use client';


import { useMemo, useState } from 'react';
import { FaPowerOff, FaTrashCan } from 'react-icons/fa6';
import Image from 'next/image';
import { addEuroSign, addInches } from '@/utils';
import { api } from '@/trpc/react';
import { debounce } from 'lodash';
import { toast } from '@/components/ui/use-toast';
import { Status } from '../status';
import { useRouter } from 'next/navigation';
import { EditProduct } from '../modal/edit-product';
import { Pagination } from '@nextui-org/pagination';

export const ProductTable = () => {

    const router = useRouter()
    const { data } = api.product.getAllProducts.useQuery()
    const { mutate } = api.product.deleteProduct.useMutation({
        onSuccess: () => {
            toast({
                variant: "default",
                title: "Sucess!!!",
                description: "Product Deleted Successfullly.",
                duration: 2000,
                className: "bg-green-600 text-white"
            })
            router.refresh()
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Failed!!.",
                description: "You can't delete this product.",
                duration: 2000,
                className: "bg-red-600 text-white"
            })
        }
    })
    const toogler = api.product.toogleStatus.useMutation({
        onSuccess: () => {
            toast({
                variant: "default",
                title: "Sucess!!!",
                description: "Product Updated Successfullly.",
                duration: 2000,
                className: "bg-green-600 text-white"
            })
            router.refresh()
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Failed!!.",
                description: "Updation error.",
                duration: 2000,
                className: "bg-red-600 text-white"
            })
        }
    })
    const [page, setPage] = useState<number>(1)
    const [globalFilter, setGlobalFilter] = useState<string>('')

    const rowsPerPage = 8
    const pages = Math.ceil((data?.length ?? 0) / rowsPerPage);
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (globalFilter === "" || globalFilter === " ") {
            return data;
        }
        return data.filter(item =>
            item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
            item.code.toLowerCase().includes(globalFilter.toLowerCase()) ||
            addEuroSign(item.price).includes(globalFilter.toLowerCase())
        );
    }, [data, globalFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
    }, [page, filteredData]);


    const debounceFilter = debounce((value) => {
        if (value == '') {
            setGlobalFilter(" ")
            return
        }
        setGlobalFilter(value)
    }, 300)

    const deleteProduct = (productId: number) => {
        mutate({ productId: productId })
    }
    const Toogle = (productId: number, status: boolean) => {
        toogler.mutate({ productId: productId, status: status })
    }
    return (

        <table className="m-1 bg-white rounded-md shadow-md">
            <thead>
                <tr className="border-b-2 p-2">
                    <th className='font-bold text-black text-center text-lg p-3'>Image</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Name</th>
                    <th className='font-bold text-black text-center text-lg p-3'>SKU</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Price</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Status</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Size</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Delete</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Edit</th>
                    <th className='font-bold text-black text-center text-lg p-3'>Active/Inactive</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td className="flex justify-center">
                            <div className="w-[5rem] h-[4rem]">
                                <Image
                                    src={item.image}
                                    alt="Product image"
                                    width={250}
                                    height={250}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.code}</td>
                        <td className="text-center">{addEuroSign(item.price)}</td>
                        <td className="text-center"><Status status={item.active} /></td>
                        <td className="text-center">{addInches(item.size)}</td>
                        <td className="text-center">
                            <button
                                className="text-red-600 border-2 border-red-600 rounded-full p-2"
                                onClick={() => deleteProduct(item.id)}
                            >
                                <FaTrashCan />
                            </button>
                        </td>
                        <td className="text-center">
                            <EditProduct product={item} />
                        </td>
                        <td className="text-center">
                            <button
                                className="text-yellow-600 border-2 border-yellow-600 rounded-full p-2"
                                onClick={() => Toogle(item.id, item.active)}
                            >
                                <FaPowerOff />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={9} className="border-t-2">
                        <div className="flex justify-center m-4">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="danger"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    </td>
                </tr>
            </tfoot>

        </table>


    );
};

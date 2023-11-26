'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { FaPencil, FaPowerOff, FaTrashCan } from 'react-icons/fa6';
import Image from 'next/image';
import { addEuroSign, addInches } from '@/utils';
import { api } from '@/trpc/react';
import { Button } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { toast } from '@/components/ui/use-toast';
import { Status } from '../status';
import { useRouter } from 'next/navigation';

export const ProductTable = () => {

    const router = useRouter()
    const { data } = api.product.getAllProducts.useQuery()
    const {mutate} = api.product.deleteProduct.useMutation({
        onSuccess:()=>{
            toast({
                variant: "default",
                title: "Sucess!!!",
                description: "Product Deleted Successfullly.",
                duration:2000,
                className:"bg-green-600 text-white"
            })
            router.refresh()
        },
        onError:()=>{
            toast({
                variant: "destructive",
                title: "Failed!!.",
                description: "You can't delete this product.",
                duration:2000,
                className:"bg-red-600 text-white"
            })
        }
    })
    const toogler = api.product.toogleStatus.useMutation({
        onSuccess:()=>{
            toast({
                variant: "default",
                title: "Sucess!!!",
                description: "Product Updated Successfullly.",
                duration:2000,
                className:"bg-green-600 text-white"
            })
            router.refresh()
        },
        onError:()=>{
            toast({
                variant: "destructive",
                title: "Failed!!.",
                description: "Updation error.",
                duration:2000,
                className:"bg-red-600 text-white"
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

    const deleteProduct = (productId:number)=>{
        mutate({productId:productId})
    }
    const Toogle = (productId:number,status:boolean)=>{
        toogler.mutate({productId:productId,status:status})
    }
    return (
        <div className="my-4">
            <Table
                aria-label="cart detail table"
                topContent={
                    <div className="bg-white flex flex-col gap-1 p-3 border-2 rounded-lg">
                        <input onChange={(e) => debounceFilter(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="text-lg w-full py-1 active:outline-none focus:outline-none" />
                    </div>
                }
                bottomContent={
                    <div className="flex w-full justify-center">
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
                }
                classNames={{
                    wrapper: 'min-h-[18rem]',
                    base: ' overflow-scroll',
                }}
            >
                <TableHeader >
                    <TableColumn className='font-bold text-black'> </TableColumn>
                    <TableColumn className='font-bold text-black'>Name</TableColumn>
                    <TableColumn className='font-bold text-black'>SKU</TableColumn>
                    <TableColumn className='font-bold text-black'>Price</TableColumn>
                    <TableColumn className='font-bold text-black'>Status</TableColumn>
                    <TableColumn className='font-bold text-black'>Size</TableColumn>
                    <TableColumn className='font-bold text-black'>Delete</TableColumn>
                    <TableColumn className='font-bold text-black'>Edit</TableColumn>
                    <TableColumn className='font-bold text-black'>Active/Inactive</TableColumn>
                </TableHeader>
                <TableBody items={items} emptyContent={'No Product to Display.'}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="w-[5rem] h-[4rem]">
                                    <Image
                                        src={item.image}
                                        alt="Product image"
                                        width={250}
                                        height={250}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{addEuroSign(item.price)}</TableCell>
                            <TableCell><Status status={item.active}/></TableCell>
                            <TableCell>{addInches(item.size)}</TableCell>
                            <TableCell>
                                <Button
                                    className="text-red-600 border-2 border-red-600 rounded-full p-2"
                                    onClick={()=>deleteProduct(item.id)}
                                >
                                    <FaTrashCan />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    className="text-green-600 border-2 border-green-600 rounded-full p-2"
                                    onClick={()=>Toogle(item.id,item.active)}
                                >
                                    <FaPencil />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    className="text-yellow-600 border-2 border-yellow-600 rounded-full p-2"
                                    onClick={()=>Toogle(item.id,item.active)}
                                >
                                    <FaPowerOff />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

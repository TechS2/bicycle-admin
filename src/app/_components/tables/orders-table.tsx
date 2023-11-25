'use client'
import { api } from "@/trpc/react"
import { addEuroSign } from "@/utils"
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react"
import { debounce } from "lodash"
import { useState, useMemo } from "react"


export const OrderTable = ()=>{
    const {data} = api.order.getAllOrders.useQuery()
    const [page, setPage] = useState<number>(1)
    const [globalFilter, setGlobalFilter] = useState<string>('')

    const rowsPerPage = 8
    const pages = Math.ceil((data?.length ?? 0 )/ rowsPerPage);
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (globalFilter === "" || globalFilter === " ") {
            return data;
        }
        return data.filter(item =>
            item.personalEmail.toLowerCase().includes(globalFilter.toLowerCase()) ||
            item.paymentEmail.toLowerCase().includes(globalFilter.toLowerCase()) ||
             item.captureId.toLowerCase().includes(globalFilter.toLowerCase()) ||
            addEuroSign(String(item.amount)).includes(globalFilter.toLowerCase())
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
                            defaultValue={page}
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
                    <TableColumn className='font-bold text-black'>Id</TableColumn>
                    <TableColumn className='font-bold text-black'>Cart Id</TableColumn>
                    <TableColumn className='font-bold text-black'>CaptureId</TableColumn>
                    <TableColumn className='font-bold text-black'>Email(Personal)</TableColumn>
                    <TableColumn className='font-bold text-black'>Email(Payment)</TableColumn>
                    <TableColumn className='font-bold text-black'>Amount</TableColumn>
                    <TableColumn className='font-bold text-black'>Action</TableColumn>
                </TableHeader>
                <TableBody items={items} emptyContent={'No Product to Display.'}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.id}
                            </TableCell>
                            <TableCell>{item.Cart[0]?.id}</TableCell>
                            <TableCell>{item.captureId}</TableCell>
                            <TableCell>{item.personalEmail}</TableCell>
                            <TableCell>{item.paymentEmail}</TableCell>
                            <TableCell>{addEuroSign(String(item.amount))}</TableCell>
                            <TableCell>
                                <Button
                                    className="text-red-600 border-2 border-red-600 rounded-full p-2"

                                >
                                    Detail
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </div>
    );
}
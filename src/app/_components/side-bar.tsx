import Link from "next/link"

import { AiFillSetting } from 'react-icons/ai'
import { TbPackages } from 'react-icons/tb'
import { BsFillBoxFill } from 'react-icons/bs'

export const SideBar = () => {

    return (
        <div className="bg-gray-100 sticky top-[4.4rem] p-2 m-2 rounded-md h-[calc(100vh-70px)]">
            <div className="flex flex-col gap-2">
                <Link href="/dashboard" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <BsFillBoxFill className="my-1" />Products
                </Link>
                <Link href="/dashboard/order" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <TbPackages className="my-1" />Orders
                </Link>
                <Link href="/dashboard/setting" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <AiFillSetting className="my-1" />Settings
                </Link>
            </div>
        </div>
    )
}
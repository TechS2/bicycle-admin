import Link from "next/link"

import {FaCube,FaBoxOpen,FaGear} from 'react-icons/fa6'
import { LogOut } from "./log-out"

export const SideBar = () => {

    return (
        <div className="bg-gray-100 sticky top-[4.4rem] p-2 m-2 rounded-md h-[calc(100vh-70px)]">
            <div className="flex flex-col gap-2">
                <Link href="/dashboard" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <FaCube className="my-1" />Products
                </Link>
                <Link href="/dashboard/order" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <FaBoxOpen className="my-1" />Orders
                </Link>
                <Link href="/dashboard/setting" className=" border-2 rounded-md font-sans flex gap-2 p-2">
                    <FaGear className="my-1" />Settings
                </Link>
                <LogOut/>
            </div>
        </div>
    )
}
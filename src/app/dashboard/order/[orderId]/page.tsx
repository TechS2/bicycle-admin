import { CartDetail } from "@/app/_components/order/cart-detail"
import { Detail } from "@/app/_components/order/detail"
import { PaymenInfo } from "@/app/_components/order/payment-info"
import { Heading } from "@/app/_components/section-heading"
import { api } from "@/trpc/server"
import { addEuroSign } from "@/utils"
import Head from "next/head"
import Image from "next/image"

export default async function OrderDetail({ params }: { params: { orderId: string } }) {

    const orderDetail = await api.order.orderDetail.query({ orderId: params.orderId })
    return (
        <section className=" flex flex-col gap-3 bg-white font-serif  m-2 p-3 rounded-lg">
            <Heading title="Order Details" />
            <PaymenInfo captureId={orderDetail?.captureId} paymentEmail={orderDetail?.paymentEmail} personalEmail={orderDetail?.personalEmail} amount={orderDetail?.amount} />
            <CartDetail cartId={orderDetail?.Cart[0]?.id} cartLength={orderDetail?.Cart[0]?.CartItem.length} />
            <Heading title="Products" />
            <div className="grid grid-cols-3 p-4 gap-2">
                {
                    orderDetail?.Cart[0]?.CartItem.map((item) => (
                        <Detail item={item}/>
                    ))
                }
            </div>
        </section>
    )
}
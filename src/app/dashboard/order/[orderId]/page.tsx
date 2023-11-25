import { CartDetail } from "@/app/_components/order/cart-detail"
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
                        <article className="col-span-1 flex-col gap-5 border-2 border-gray-200 p-3 rounded-xl" key={item.id}>
                            <div className="flex flex-wrap justify-between gap-2">
                                <div className="flex   align-middle items-center gap-2">
                                    <div className="text-base font-bold">Quantity :</div>
                                    <div className="text-sm font-medium">{item.quantity}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Rental Days :</div>
                                    <div className="text-sm font-medium">{item.dif}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Start Date :</div>
                                    <div className="text-sm font-medium">{item.startDate}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">End Date :</div>
                                    <div className="text-sm font-medium">{item.endDate}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Size(if any) :</div>
                                    <div className="text-sm font-medium">{item.size}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Product Name :</div>
                                    <div className="text-sm font-medium">{item.Product.name}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Product Code :</div>
                                    <div className="text-sm font-medium">{item.Product.code}</div>
                                </div>
                                <div className="flex  align-middle items-center gap-2">
                                    <div className="text-base font-bold px-2">Product Price :</div>
                                    <div className="text-sm font-medium">{addEuroSign(item.Product.price)}</div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Image src={`${item.Product.image}`} width={200} height={100} alt={`${item.Product.name}_image`} />
                            </div>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}
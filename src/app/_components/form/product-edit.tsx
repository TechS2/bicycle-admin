'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { z } from 'zod'
import axios from 'axios'
import { useState } from "react"
import Image from "next/image"
const formSchema = z.object({
    product: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.any(),
    size: z.string()
})


export const ProductEditForm = ({ product }: { product: ProductProp }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: product.name,
            description: product.description,
            price: Number(product.price),
            image: undefined,
            size: product.size,
        }
    })

    const { mutate } = api.product.editProduct.useMutation({
        onSuccess: () => {
            form.reset()
            window.location.reload()
        }
    })
    const [submiting, setSubmiting] = useState<boolean>(false)

    const saveToCloud = async (image: Blob) => {
        const formData = new FormData()
        formData.append("image", image)
        const response = await axios.post("/api/file", formData)
        return response.data.url
    }
    const formSubmitted = async (data: FieldValues) => {


        setSubmiting((prev) => !prev)

        const url = data.image instanceof(Blob) ? await saveToCloud(data.image): product.image
        mutate({
            productId:product.id,
            name: data.product,
            description: data.description,
            price: String(data.price),
            image: url,
            size: data.size
        })
        setSubmiting((prev) => !prev)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmitted)} className="grid grid-cols-2  gap-2">
                <div className="col-span-2 flex justify-center">
                    <Image className=" w-[10rem] h-auto" src={product.image} alt="prodct image" width={500} height={300} />
                </div>
                <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Bicycle Name" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.product?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter the description" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.description?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Picture(optional)</FormLabel>
                            <FormControl>
                                <Input type="file" onChange={(e) => {
                                    if (e.target.files)
                                        field.onChange(e.target.files[0])
                                }} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.image?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Price</FormLabel>
                            <FormControl>
                                <Input type="number"  {...field} onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        field.onChange(value)
                                        return
                                    }
                                    field.onChange(0)
                                }} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.price?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Size</FormLabel>
                            <FormControl>
                                <Input placeholder="26,27,29" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.size?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <button type="submit" className="col-span-2 bg-c-primary hover:bg-white hover:text-c-primary border-2 hover:border-c-primary text-white p-1 rounded-md" disabled={submiting}>
                    {submiting ? "Submitting" : "Submit"}
                </button>
            </form>

        </Form>
    )
}
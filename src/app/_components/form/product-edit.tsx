'use client'


import { api } from "@/trpc/react"
import { FieldValue, FieldValues, useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"


export const ProductEditForm = ({ product }: { product: ProductProp }) => {

    const router = useRouter()
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const { mutate } = api.product.editProduct.useMutation({
        onSuccess: () => {
            reset()
            router.refresh()
        }
    })
    const [submiting, setSubmiting] = useState<boolean>(false)

    const saveToCloud = async (data: FieldValues) => {
        const fileBase64: string = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(data.image[0])
        })
        return fileBase64
    }

    const formSubmitted = async (data: FieldValues) => {
        setSubmiting((prev) => !prev)
        console.log( data.image[0])
        if (data.image[0]) {
            const base64 = await saveToCloud(data)
            mutate({
                productId: product.id,
                name: data.name,
                description: data.description,
                price: String(data.price),
                image: base64,
                size: data.size
            })
        }
        else {
            mutate({
                productId: product.id,
                name: data.name,
                description: data.description,
                price: String(data.price),
                image: "",
                size: data.size
            })
        }
        setSubmiting((prev) => !prev)
    }

    return (
        <form onSubmit={handleSubmit(formSubmitted)} className="grid grid-cols-2 gap-2 [&_input]:border-2 [&_textarea]:border-2 [&_input]:p-2 [&_textarea]:p-2">
            <div className="col-span-2 flex justify-center">
                <Image className=" w-[10rem] h-auto" src={product.image} alt="prodct image" width={500} height={300} />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="outlined-adornment-name">Product Name</label>
                <input
                    type="text"
                    id="outlined-adornment-name"
                    className="text-black"
                    {...register('name', {
                        required: "Product Name is required.",
                    })}
                    defaultValue={product.name}
                />
                {errors.name?.message && (
                    <small className="text-red-600">{errors.name.message.toString()}</small>
                )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="outlined-adornment-description">Description</label>
                <textarea
                    rows={3}
                    id="outlined-adornment-description"
                    className="text-black"
                    {...register('description', {
                        required: "Description is required.",
                    })}
                    defaultValue={product.description}
                />
                {errors.description?.message && (
                    <small className="text-red-600">{errors.description.message.toString()}</small>
                )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="outlined-adornment-image">Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    id="outlined-adornment-image"
                    className="text-black"
                    {...register('image', { required: false })}
                />
                {errors.image?.message && (
                    <small className="text-red-600">{errors.image.message.toString()}</small>
                )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="outlined-adornment-price">Product Price</label>
                <input
                    type="number"
                    step={0.01}
                    id="outlined-adornment-price"
                    className="text-black"
                    {...register('price', {
                        required: "Product Price is required.",
                        min: { value: 1.00, message: "Product Price must be at least 1." },
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Invalid price format. Use up to two decimal places."
                        }
                    })}
                    defaultValue={product.price}
                />
                {errors.price?.message && (
                    <small className="text-red-600">{errors.price.message.toString()}</small>
                )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="outlined-adornment-size">Product Size</label>
                <input
                    type="text"
                    id="outlined-adornment-size"
                    className="text-black"
                    {...register('size', {
                        required: "Product Size is required.",
                    })}
                    defaultValue={product.size}
                />
                {errors.size?.message && (
                    <small className="text-red-600">{errors.size.message.toString()}</small>
                )}
            </div>
            <button type="submit" className="col-span-2 bg-c-primary hover:bg-white hover:text-c-primary border-2 hover:border-c-primary text-white p-1 rounded-md" disabled={submiting}>
                {submiting ? "Submitting" : "Submit"}
            </button>
        </form>
    )
}
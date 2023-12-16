'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react"
import { FieldValues, useForm } from "react-hook-form"
import { useState } from "react"
import { max } from "lodash"


export const ProductForm = () => {

    const {register,handleSubmit,formState:{errors},reset} = useForm()
    const { mutate } = api.product.insertOne.useMutation({
        onSuccess: () => {
            reset()
            window.location.reload()
        }
    })
    const [submiting, setSubmiting] = useState<boolean>(false)

    const formSubmitted = async (data: FieldValues) => {
        setSubmiting((prev) => !prev)
        const fileBase64: string = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(data.image[0]);
        })
        mutate({
            name: data.name,
            description: data.description,
            price: String(data.price),
            image: fileBase64,
            size: data.size
        })
        setSubmiting((prev) => !prev)
    }
    return (

            <form onSubmit={handleSubmit(formSubmitted)} className="grid grid-cols-2 gap-2 [&_input]:border-2 [&_textarea]:border-2 [&_input]:p-2 [&_textarea]:p-2">
                <div className="col-span-2 flex flex-col gap-2">
                    <label htmlFor="outlined-adornment-name">Product Name</label>
                    <input
                        type="text"
                        id="outlined-adornment-name"
                        className="text-black"
                        {...register('name', {
                            required: "Product Name is required.",
                        })}
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
                        {...register('image', {
                            required: "Image is required.",
                        })}
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
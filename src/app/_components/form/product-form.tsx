'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { z } from 'zod'

const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.instanceof(File),
    size: z.string()
})


export const ProductForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const formSubmitted = async (data: FieldValues) => {
        console.log(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmitted)} className="grid grid-cols-2  gap-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Bicycle Name" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.name?.message?.toString()}</FormMessage>
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
                            <FormLabel className="text-base">Price</FormLabel>
                            <FormControl>
                                <Input type="file"   onChange={(e) => {
                                    if(e.target.files)
                                        field.onChange(e.target.files[0])
                                }}  />
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
                <Button type="submit" className="col-span-2 bg-yellow-600 text-white">
                    Submit
                </Button>
            </form>

        </Form>
    )
}
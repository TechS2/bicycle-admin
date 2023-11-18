'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { type FieldValues, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password is Required"
    }),
    email: z.string().email({
        message: "Email is required"
    })
})

export const LoginForm = () => {

    const [visible, setVisible] = useState<boolean>(false)
    const [submiting, setSubmiting] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const formSubmitted = async (data: FieldValues) => {

        setSubmiting((prev) => !prev)
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        setSubmiting((prev) => !prev)
        if (signInData?.error)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                className:"bg-red-600 text-white"
            })
        if (!signInData?.error)
            router.push("/")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmitted)} className="grid grid-cols-2  gap-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Email</FormLabel>
                            <FormControl>
                                <Input className="placeholder-shown:text-white placeholder:text-white" placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.email?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel className="text-base">Password</FormLabel>
                            <FormControl>
                                <div className="flex ">
                                    <Input className="placeholder-shown:text-white placeholder:text-white outline-0 border-r-0 rounded-r-none" type={visible ? "text" : "password"} placeholder="**********" {...field} />
                                    <button
                                        type="button"
                                        className="border-[1px] border-l-0 outline-0 rounded-md rounded-l-none px-1"
                                        onClick={() => {
                                            setVisible((prev) => !prev)
                                        }}
                                    >
                                        {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="text-sm text-red-600">{form.formState.errors.password?.message?.toString()}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="col-span-2 bg-yellow-600 text-white">
                    {submiting ? "Login..." : "Login"}
                </Button>
            </form>

        </Form>

    )
}
'use client'

import { type FieldValues, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react"
import { divide } from "lodash"


export const LoginForm = () => {

    const [visible, setVisible] = useState<boolean>(false)
    const [submiting, setSubmiting] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)
    const router = useRouter()

    const { register, formState: { errors }, handleSubmit } = useForm()

    const formSubmitted = async (data: FieldValues) => {

        setSubmiting((prev) => !prev)
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        setSubmiting((prev) => !prev)
        console.log(signInData?.error)
        if (signInData?.error)
            setAlert(() => true)
        if (!signInData?.error)
            router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit(formSubmitted)} className="grid grid-cols-2  [&_input]:bg-transparent  [&_input]:p-2 gap-1">
            {alert && <div className="col-span-2 text-red-600">
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>Email or Password is wrong!</AlertTitle>
                </Alert>
            </div>}
            <div className="col-span-2 flex flex-col gap-2">
                <label className="text-white  font-sans text-base md:text-xl">
                    Email
                </label>
                <input {...register('email', {
                    required: 'Email is required',
                })}

                    type="email" className="placeholder-shown:text-white placeholder:text-white border-1 rounded-md" placeholder="example@gmail.com" />
                <div className="text-red-600">{errors.email?.message?.toString()}</div>
            </div>
            <div className="col-span-2 flex flex-col gap-4 ">
                <label className="text-white  font-sans text-base md:text-xl">
                    Password
                </label>
                <div className="flex">
                    <input {...register('password', {
                        required: 'Password is required',
                    })}
                        type={visible ? "text" : "password"} className="placeholder-shown:text-white placeholder:text-white outline-0 border-1  border-r-0 rounded-md rounded-r-none w-full" placeholder="********" />
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

                <div className="text-red-600">{errors.password?.message?.toString()}</div>
            </div>
            <button type="submit" className="col-span-2 bg-yellow-600 text-white py-2 rounded-md">
                {submiting ? "Login..." : "Login"}
            </button>
        </form >
    )
}
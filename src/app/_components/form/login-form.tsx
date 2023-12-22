'use client'

import { type FieldValues, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'


export const LoginForm = () => {

    const [visible, setVisible] = useState<boolean>(false)
    const [submiting, setSubmiting] = useState<boolean>(false)
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
        if (signInData?.error)
            console.log('s')
        if (!signInData?.error)
            router.push("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit(formSubmitted)} className="grid grid-cols-2  gap-2">
            <div className="flex flex-col gap-4">
                <label className="text-gray-900  font-sans text-base md:text-xl">
                    Quantity
                </label>
                <input {...register('quantity', {
                    required: 'Quantity is required',
                    min: {
                        value: 1,
                        message: 'Quantity must be greater than or equal to 1',
                    },
                    setValueAs: (value) => Math.max(1, parseInt(value) || 1),
                })}
                    onChange={(e) => e.target.value = String(Math.max(1, parseInt(e.target.value)))}
                    type="number" className="w-52 h-10 border-2 rounded-md p-2" defaultValue={1} />
                <div className="text-red-600">{errors.quantity?.message?.toString()}</div>
            </div>
            <div className="flex flex-col gap-4">
                <label className="text-gray-900  font-sans text-base md:text-xl">
                    Quantity
                </label>
                <div className="flex">
                    <input {...register('quantity', {
                        required: 'Quantity is required',
                        min: {
                            value: 1,
                            message: 'Quantity must be greater than or equal to 1',
                        },
                        setValueAs: (value) => Math.max(1, parseInt(value) || 1),
                    })}
                        onChange={(e) => e.target.value = String(Math.max(1, parseInt(e.target.value)))}
                        type="number" className="w-52 h-10 border-2 rounded-md p-2" defaultValue={1} />
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

                <div className="text-red-600">{errors.quantity?.message?.toString()}</div>
            </div>
            <button type="submit" className="col-span-2 bg-yellow-600 text-white">
                {submiting ? "Login..." : "Login"}
            </button>
        </form>
    )
}
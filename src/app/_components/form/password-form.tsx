'use client'
import { type FieldValues, useForm } from "react-hook-form"

export const PasswordForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const formSubmitted = (data: FieldValues) => {

        console.log(data)
    }
    return (
        <form className="flex gap-2" onSubmit={handleSubmit(formSubmitted)}>
            <div className="flex align-middle items-center gap-2">
                <label htmlFor="password" className="text-gray-900 text-lg">Password</label>
                <div className="flex flex-col gap-1">
                    <input
                        className="border-2 border-gray-900 rounded-md px-2 py-1"
                        type="password"
                        {...register('password', {
                            required: "Password is required.",
                            minLength: {
                                value:8,
                                message:"Minimium length 8"
                            }
                        })}
                        placeholder="**********"
                    />
                    {errors.password?.message && <small className="text-red-600">{errors.password.message?.toString()}</small>}
                </div>

            </div>
            <button type="submit" className="bg-gray-900 text-white p-2 rounded-md">
                Change
            </button>
        </form>
    )
}
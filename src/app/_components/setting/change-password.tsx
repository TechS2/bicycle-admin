import { PasswordForm } from "../form/password-form"


export const ChangePassword = () => {
    return (

        <div className="flex justify-between align-middle items-center border-2 rounded-md p-3">
            <h2 className="text-gray-900 text-2xl xfont-serif ">Change Password</h2>
            <PasswordForm/>
        </div>
    )
}
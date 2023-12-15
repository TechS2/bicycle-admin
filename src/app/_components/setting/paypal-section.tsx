import { PayPalButton } from "@/app/_components/paypal/paypal-button";

export const PayPalSection = () => (

    <div className="flex justify-between border-2 rounded-md p-2">
        <div className="flex flex-col p-2">
            <strong className="text-xl text-gray-600">Connect with PayPal</strong>
            <p className="text-medium text-gray-900">Connect your PayPal account with platform to receive payments</p>
        </div>
        <PayPalButton />
    </div>
) 
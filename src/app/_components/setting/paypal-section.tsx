import { PayPalButton } from "@/app/_components/paypal-button";

export const PayPalSection = () => (

    <div className="flex justify-between align-middle items-center border-2 rounded-md p-3">
        <h2 className="text-gray-900 text-2xl xfont-serif ">Connect with PayPal</h2>
        <PayPalButton />
    </div>
)
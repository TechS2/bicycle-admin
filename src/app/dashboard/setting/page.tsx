import { Heading } from "@/app/_components/section-heading";
import { ChangePassword } from "@/app/_components/setting/change-password";
import { PayPalSection } from "@/app/_components/setting/paypal-section";

export default function Setting() {

    return (
        <section className="flex flex-col gap-3">
            <Heading title="Settings" />
            <div className="bg-white rounded-md p-3 flex flex-col gap-2">
                <PayPalSection />
                <ChangePassword />
            </div>
        </section>
    )
}
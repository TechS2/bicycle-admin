import { Header } from "../_components/header";
import { SideBar } from "../_components/side-bar";


export const metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard to monitor the bicycle app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="grid grid-cols-12">
                <aside className="col-span-2">
                    <SideBar />
                </aside>
                <main className="col-span-10 bg-gray-100 m-3 rounded-md py-2 px-3">
                    {children}
                </main>
            </div>
        </>

    );
}

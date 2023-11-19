import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className="bg-[url('/bg-404.jpg')] bg-no-repeat h-[calc(100vh)]">
        <div className="flex flex-col gap-5 justify-center align-middle items-center">
            <p className="text-[10rem] md:text-[20rem] text-gray-400">404</p>
            <p className="text-gray-400 text-3xl md:text-5xl">Page Not Found</p>
            <button className="bg-[#FFEB79] text-gray-900 text-lg font-bold rounded-md p-4">
                <Link href="/dashboard" className="w-full h-full">Go to dashboard</Link>
            </button>
        </div>
    </section>
  )
}
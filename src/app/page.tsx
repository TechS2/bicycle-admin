import Image from "next/image";
import { LoginForm } from "./_components/form/login-form";

export default function Home() {
  return (
    <main>
      <section className="relative h-screen">
        <Image width={1600} height={768} className="w-full h-full object-cover brightness-50" src="/login.jpg" alt="intro image" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center align-middle">
          <div className="grid grid-cols-2 shadow-xl rounded-2xl backdrop-blur-lg bg-white/30">
            <div className="col-span-2 p-10 w-96 flex flex-col space-y-6 text-white">
              <h2 className="text-2xl text-center font-serif">Login Here</h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


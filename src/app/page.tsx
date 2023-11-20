import Image from "next/image";
import { LoginForm } from "./_components/form/login-form";

export default  function Home() {

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
    // <div className="flex justify-center items-center align-middle h-screen gap-2">
    //         <div
    //             className="w-32 aspect-square rounded-full relative flex justify-center items-center align-middle  animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
    //         >
    //             <span
    //                 className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
    //             >
    //             </span>
    //         </div>
    //     </div>

    // <section className="relative h-screen">
    //   <div className="flex justify-center items-center align-middle bg-gray-800 h-full w-full">
    //     <div className="animate-[spin_6s_linear_infinite]  bg-gray-300 rounded-full shadow-md shadow-white h-[35rem] w-[35rem] "></div>
    //     <div className="grid absolute top-50 left-50 z-[3000] h-[25rem] w-[25rem] bg-white aspect-square rounded-full shadow-sm shadow-black animate-[spin_6s_linear_infinite]">
    //     </div>
    //   </div>
    //   <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center align-middle z-[5000]">
    //       <h1 className="text-black font-serif text-3xl px-5=++98-------/*-+233.
          
    //       +
    //       ">Project Zero</h1>
    //   </div>
    // </section>
  );
}


"use client";

import Button from "@/components/button";
import ImageContainer from "@/components/image";
import { useRouter } from "next/navigation";


export default function Home() {

 const navigate = useRouter();

  return (
   <>
   <div className="grid grid-cols-6  h-[100vh]">
    <div className="col-span-3 pt-10 pl-20">
    <ImageContainer></ImageContainer>
    </div>
    <div className="pl-10 col-span-3 flex flex-col justify-center items-center">
        <h1 className="text-white font-semibold text-[3rem]">Welcome to <span className="text-blue-500 font-bold text-[4rem]">UnChess.com</span></h1>
        <h1 className="text-white font-semibold text-[2rem] ">Definitely not the <span className="text-blue-500 font-bold text-[4rem] pl-2">#1</span>chess website.</h1>
     <Button title = "PLAY" onClick= {()=> {
        navigate.push("/game");
     }} />
    </div>
   </div>
   
   </>
  );
}

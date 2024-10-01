"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";



export default function Button ( { title,  onClick } : { title : string , onClick : any} ) {
   const navigate = useRouter();


 return <div>

  <button onClick={onClick} className="bg-blue-400  font-bold p-3 rounded-2xl w-40 mt-3 hover:bg-cyan-800 text-black text-xl">{title}</button>

  </div>

}
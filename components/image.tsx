import Image from "next/image";

export default function ImageContainer() {
    

    return <div className="">
         <Image src="/chess.jpeg" alt="idk" width={500} height={500} className="w-[800px] rounded-3xl"/>
    </div>
}
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Navbar(){
    return(
        <nav className=" fixed top-0 w-full flex items-center justify-center bg-[#fffdf7] px-6 py-4 border-b gap-40 shadow-sm">
            <Link href="/" className="text-2xl font-bold font-inter ">
            <span className="text-[#4f35d2] font-[JetBrains Mono]">Uni</span>link
            </Link>

            <div className="flex gap-6">
                <Link href="/" className="text-gray-700 hover:bg-purple-200 px-4 py-1.5 rounded-lg hover:text-[#4f35d2] font-semibold font-outfit">
                    Home
                </Link>
                <Link href="/marketplace" className="text-gray-700 hover:bg-purple-200 px-4 py-1.5 rounded-lg hover:text-[#4f35d2] font-semibold font-outfit">
                    Marketplace
                </Link>
                <Link href="/" className="text-gray-700 hover:bg-purple-200 px-4 py-1.5 rounded-lg hover:text-[#4f35d2] font-semibold font-outfit">
                    Messages
                </Link>
            </div>

            <button className="flex bg-[#4f35d2] p-2 rounded-full px-4 text-white gap-2 font-[inter] font-semibold"><Plus />  Post Product</button>
        </nav>
    );
}
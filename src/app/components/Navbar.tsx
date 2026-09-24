import Link from "next/link";
import { Plus, ShoppingBag, LayoutDashboard , MessageSquare} from "lucide-react";

export default function Navbar(){
    return(
        <nav className=" fixed top-0 w-full flex items-center justify-center bg-[#fffdf7] px-6 py-4 border-b gap-40 shadow-sm z-50">
            <Link href="/" className="text-2xl font-bold font-inter ">
            <span className="text-emerald-600 font-[JetBrains Mono]">Uni</span>link
            </Link>

            <div className="flex gap-6">
                <Link href="/" className="flex items-center gap-2 text-gray-700 hover:bg-emerald-100 px-4 py-2 rounded-lg hover:text-emerald-600 font-semibold font-outfit">
                   <LayoutDashboard size={20}/> Dashboard
                </Link>
                <Link href="/marketplace" className="flex items-center gap-2 text-gray-700 hover:bg-emerald-100 px-4 py-2 rounded-lg hover:text-emerald-600 font-semibold font-outfit">
                   <ShoppingBag size={20}/> Marketplace
                </Link>
                <Link href="/messages" className="flex items-center gap-2 text-gray-700 hover:bg-emerald-100 px-4 py-2 rounded-lg hover:text-emerald-600 font-semibold font-outfit">
                    <MessageSquare size={20} />Messages
                </Link>
            </div>

            <button className="flex bg-emerald-600 p-2 rounded-full px-4 text-white gap-2 font-[inter] font-semibold hover:bg-emerald-300"><Plus />  Post Product</button>
        </nav>
    );
}
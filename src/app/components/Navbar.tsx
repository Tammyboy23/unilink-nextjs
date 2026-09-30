"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Plus, ShoppingBag, LayoutDashboard, User, Bell } from "lucide-react";

export default function Navbar(){
    const pathname = usePathname()
    return(
        <nav className=" fixed top-0 w-full flex items-center justify-between bg-white px-25 max-md:px-5 py-4 border-b border-gray-200 gap-40 shadow-sm z-50">
            <Link href="/" className="flex items-center gap-2 font-inter text-2xl font-bold">
            <Image src="/logo.png" width={36} height={36} alt="" className="h-9 w-9 object-contain rounded-lg" />
            <span><span className="text-emerald-600 font-[JetBrains Mono]">Uni</span>link</span>
            </Link>

            <div className="flex gap-6 hidden md:flex">
                <Link href="/" className={`flex items-center gap-2 hover:text-black px-4 py-2 rounded-lg  font-semibold font-outfit ${pathname === "/"? "bg-emerald-100 text-emerald-600 hover:text-emerald-600": "text-gray-700"}`}>
                   <LayoutDashboard size={20}/> Dashboard
                </Link>
                <Link href="/marketplace" className={`flex items-center gap-2 hover:text-black px-4 py-2 rounded-lg  font-semibold font-outfit ${pathname === "/marketplace"? "bg-emerald-100 text-emerald-600 hover:text-emerald-600": "text-gray-700"}`}>
                   <ShoppingBag size={20}/> Marketplace
                </Link>
                <Link href="/profile" className={`flex items-center gap-2 hover:text-black px-4 py-2 rounded-lg  font-semibold font-outfit ${pathname === "/profile"? "bg-emerald-100 text-emerald-600 hover:text-emerald-600": "text-gray-700"}`}>
                    <User size={20} />Profile
                </Link>
            </div>

            <div className="flex gap-6">
                <button className="hover:bg-slate-200 px-2.5 rounded-xl"><Bell size={20} /></button>
                <img src="profile.jpg" alt="" className="w-10 h-10 rounded-full border border-emerald-600" />
            </div>
        </nav>
    );
}
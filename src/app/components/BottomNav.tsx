import Link from "next/link"
import { LayoutDashboard, ShoppingBag, MessageSquare } from "lucide-react"
export default function BottomNav(){
    return(
        <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-between border-t bg-white px-10 py-5 w-full ">
            <Link href="/" className="flex flex-col items-center"><LayoutDashboard />Dashboard</Link>
            <Link href="/marketplace" className="flex flex-col items-center"><ShoppingBag />Marketplace</Link>
            <Link href="/messages" className="flex flex-col items-center"> <MessageSquare />Messages</Link>
        </nav>
    )
}
import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="flex items-center justify-center px-6 py-4 border-b gap-8">
            <Link href="/" className="text-2xl font-bold">
            Unilink
            </Link>

            <div className="flex gap-6">
                <Link href="/" >Home</Link>
                <Link href="/marketplace">Marketplace</Link>
                <Link href="/sell" >Sell</Link>
            </div>

        </nav>
    );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Home } from "lucide-react";

const links = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/marketplace", label: "Marketplace", Icon: ShoppingBag },
    { href: "/profile", label: "Profile", Icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();
    const activeIndex = Math.max(
        links.findIndex(({ href }) => href === "/" ? pathname === href : pathname.startsWith(href)),
        0
    );

    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return (
        <nav aria-label="Main navigation" className=" glass fixed inset-x-0 bottom-1 mx-5 rounded-full z-50 border-t border-slate-200/80 bg-white/95 px-2 pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden">
            <div className="relative mx-auto grid max-w-lg grid-cols-3 items-stretch">
                <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/3 rounded-xl bg-emerald-50 transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${activeIndex * 100}%)` }}
                />
                {links.map(({ href, label, Icon }) => {
                    const active = href === "/" ? pathname === href : pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={`relative z-10 flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-semibold transition-colors ${active ? "text-emerald-700" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            <Icon size={21} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                            <span className="truncate">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
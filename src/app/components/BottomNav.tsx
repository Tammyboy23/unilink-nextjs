"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User } from "lucide-react";

const links = [
    { href: "/", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/marketplace", label: "Marketplace", Icon: ShoppingBag },
    { href: "/profile", label: "Profile", Icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return (
        <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/95 px-2 pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden">
            <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1">
                {links.map(({ href, label, Icon }) => {
                    const active = href === "/" ? pathname === href : pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={`flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-semibold transition-colors ${active ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
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
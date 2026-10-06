"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  MessageCircleMore,
  Share2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  img: string;
  rating: number;
  category: string;
  school: string;
  price: number;
};

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((product: any) => ({
              id: Number(product.id),
              title: product.title ?? "Untitled product",
              description: product.description ?? "No description available.",
              img: product.img ?? product.image ?? "/placeholder.png",
              rating: Number(product.rating ?? 0),
              category: product.category ?? "General",
              school: product.school ?? "Unknown school",
              price: Number(product.price ?? 0),
            }))
          : [];

        setProducts(normalized);
      })
      .catch((error) => {
        console.error(error.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const current = products.find((product) => product.id === productId);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mt-20 min-h-screen bg-[#f7f8f5] px-5 pb-20 pt-10 sm:px-10 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="font-outfit text-xl font-semibold text-slate-700">
                Loading product...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!current) {
    return (
      <>
        <Navbar />
        <main className="mt-20 min-h-screen bg-white px-5 pb-20 pt-10 sm:px-10 lg:px-24">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="font-outfit text-2xl font-bold text-slate-800">
              Product not found
            </p>
            <Link
              href="/marketplace"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              <ArrowLeft size={18} /> Go back to marketplace
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mb-20 mt-20 min-h-screen bg-[#f7f8f5] px-5 pb-20 pt-6 sm:px-8 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-outfit text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft size={17} /> Back
            </Link>

            <div className="flex items-center gap-2">
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100">
                <Bookmark size={18} />
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={current.img}
                  alt={current.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3.5 py-1.5 font-outfit text-xs font-semibold text-white shadow-sm">
                  {current.category}
                </span>
              </div>
            </section>

            <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-6 lg:p-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <MapPin size={16} className="text-emerald-600" />
                {current.school}
              </div>

              <h1 className="mt-4 font-outfit text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {current.title}
              </h1>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
                <Star size={16} className="fill-amber-400 text-amber-500" />
                {current.rating} rating from verified students
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Description
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {current.description}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Price
                  </p>
                  <p className="mt-2 font-inter text-4xl font-black tracking-[-0.06em] text-emerald-600">
                    &#8358;{current.price.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right text-xs font-semibold text-emerald-700">
                  Verified seller
                </div>
              </div>

              <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                <MessageCircleMore size={20} /> Contact seller
              </button>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
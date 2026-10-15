"use client";

import { useQuery } from "@tanstack/react-query";
import HeroCarosel from "./components/HeroCarosel";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { Flame, Sparkles } from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  img: string;
  rating: number;
  category: string;
  school: string;
  price: number;
  total_rating: number;
  no_rating: number;
};

export default function Home() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/product");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    staleTime: 1000 * 60 * 50,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const latestProducts = Array.isArray(products) ? products.slice(0, 8) : [];

  const TrendingProducts = Array.isArray(products)? 
  products
  .filter((product) => Number(product.total_rating / product.no_rating) > 3)
  .sort((a,b) => b.total_rating / b.no_rating -
                 a.total_rating / a.no_rating
                )
                :
                []

  return (
    <>
      <Navbar />

      <main className="mb-20 min-h-screen bg-white px-25 pt-20 text-slate-900 max-md:px-5">
        <HeroCarosel />

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Latest picks
              </p>
              <h2 className="flex gap-2 items-center mt-1 font-outfit text-2xl font-bold text-slate-900">
                < Sparkles/>Fresh on UniLink
              </h2>
            </div>

            <a
              href="/marketplace"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all
            </a>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[260px] animate-pulse overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-20 rounded bg-slate-200" />
                    <div className="h-5 w-3/4 rounded bg-slate-200" />
                    <div className="h-5 w-1/3 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
              Unable to load latest products right now.
            </div>
          ) : latestProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No products yet. Check back soon.
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {latestProducts.map((product) => (
                <div key={product.id} className="min-w-[260px] max-w-[280px] flex-1">
                  <ProductCard
                    id={product.id}
                    img={product.img ?? "/placeholder.png"}
                    ratings={Number(product.total_rating / product.no_rating) || 0}
                    name={product.title}
                    price={Number(product.price ?? 0)}
                    category={product.category ?? "General"}
                    school={product.school ?? "Campus"}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
        {/* TOP TRENDING */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Top Rated Picks
              </p>
              <h2 className="flex gap-2 items-center mt-1 font-outfit text-2xl font-bold text-slate-900">
                < Flame/>Trending on UniLink
              </h2>
            </div>

            <a
              href="/marketplace"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all
            </a>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[260px] animate-pulse overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-20 rounded bg-slate-200" />
                    <div className="h-5 w-3/4 rounded bg-slate-200" />
                    <div className="h-5 w-1/3 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
              Unable to load latest products right now.
            </div>
          ) : TrendingProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No products yet. Check back soon.
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {TrendingProducts.map((product) => (
                <div key={product.id} className="min-w-[260px] max-w-[280px] flex-1">
                  <ProductCard
                    id={product.id}
                    img={product.img ?? "/placeholder.png"}
                    ratings={Number(product.total_rating / product.no_rating) || 0}
                    name={product.title}
                    price={Number(product.price ?? 0)}
                    category={product.category ?? "General"}
                    school={product.school ?? "Campus"}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
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
  phone: number;
  total_rating: number;
  no_rating: number;
};

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [reviewSummary, setReviewSummary] = useState({ averageRating: 0, ratingCount: 0 });
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((product: Product) => ({
              id: Number(product.id),
              title: product.title ?? "Untitled product",
              description: product.description ?? "No description available.",
              img: product.img ?? "/placeholder.png",
              rating: Number(product.rating ?? 0),
              category: product.category ?? "General",
              school: product.school ?? "Unknown school",
              price: Number(product.price ?? 0),
              phone: Number(product.phone ?? 0),
              total_rating: Number(product.total_rating ?? 0),
              no_rating: Number(product.no_rating ?? 0)
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

  useEffect(() => {
    if (!productId) return;

    fetch(`/api/ratings?productId=${productId}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setReviewSummary({ averageRating: 0, ratingCount: 0 });
          return;
        }

        setReviewSummary({
          averageRating: Number(data.averageRating ?? 0),
          ratingCount: Number(data.ratingCount ?? 0),
        });
      })
      .catch(() => {
        setReviewSummary({ averageRating: 0, ratingCount: 0 });
      });
  }, [productId]);

  const current = products.find((product) => product.id === productId);

  const displayAverageRating = reviewSummary.ratingCount > 0 ? reviewSummary.averageRating : Number(current?.rating ?? 0);
  const displayReviewCount = reviewSummary.ratingCount > 0 ? reviewSummary.ratingCount : 0;

  async function handleRatingSubmit() {
    if (!selectedRating || !productId) return;

    setIsSubmittingRating(true);

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: selectedRating,
        }),
      });

      const data = await response.json().catch(() => {
        setToast({ type: "success", message: data.message });
      });

      if (!response.ok || !data) {
        throw new Error(data?.message || "Unable to submit rating.");
      }

      if (typeof data.averageRating !== "number" || typeof data.ratingCount !== "number") {
        throw new Error("The rating response was incomplete.");
      }

      setReviewSummary({
        averageRating: Number(data.averageRating),
        ratingCount: Number(data.ratingCount),
      });

      setToast({ type: "success", message: "Your rating has been submitted." });
      setSelectedRating(0);
    } catch (error) {
      setToast({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong while submitting your rating.",
      });
    } finally {
      setIsSubmittingRating(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mb-20 mt-20 min-h-screen bg-[#f7f8f5] px-5 pb-20 pt-6 sm:px-8 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div aria-label="Loading product details" aria-busy="true" className="animate-pulse" role="status">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-10 w-24 rounded-xl bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-11 w-11 rounded-full bg-slate-200" />
                  <div className="h-11 w-11 rounded-full bg-slate-200" />
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="aspect-square overflow-hidden rounded-[28px] bg-slate-200 max-md:aspect-[16/9]" />

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 lg:p-7">
                  <div className="h-4 w-2/5 rounded bg-slate-200" />
                  <div className="mt-5 h-9 w-4/5 rounded bg-slate-200" />
                  <div className="mt-4 h-10 rounded-xl bg-slate-100" />

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="h-3 w-1/4 rounded bg-slate-200" />
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-full rounded bg-slate-200" />
                      <div className="h-4 w-full rounded bg-slate-200" />
                      <div className="h-4 w-3/5 rounded bg-slate-200" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
                    <div className="w-2/5">
                      <div className="h-3 w-1/2 rounded bg-slate-200" />
                      <div className="mt-3 h-9 w-full rounded bg-slate-200" />
                    </div>
                    <div className="h-9 w-28 rounded-xl bg-emerald-50" />
                  </div>

                  <div className="mt-7 h-12 w-full rounded-xl bg-emerald-100" />
                </div>
              </div>
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

      {toast && (
        <div className="pointer-events-none fixed right-4 top-4 z-[100] w-[min(92vw,360px)]">
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
            role="status"
          >
            <div className="mt-0.5 shrink-0">
              <Star
                size={18}
                className={toast.type === "success" ? "fill-emerald-500 text-emerald-600" : "text-red-600"}
              />
            </div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}

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
              <div className="relative aspect-[1/1] max-md:aspect-[16/9] overflow-hidden bg-slate-100">
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
                {Number(current.total_rating / current.no_rating) || 0} rating from {current.no_rating} review{displayReviewCount === 1 ? "" : "s"}
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

              <button
                type="button"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                onClick={() => {
                  const message = `Hi could we discuss more about the ${current.title} on Unilink`;
                  const url = `https://wa.me/234${current.phone}?text=${encodeURIComponent(message)}`;
                  window.open(url, "_blank");
                }}
              >
                <MessageCircleMore size={20} /> Contact seller
              </button>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      onClick={() => setSelectedRating(star)}
                      className="rounded-full p-1 transition hover:scale-105"
                    >
                      <Star
                        size={22}
                        className={selectedRating >= star ? "fill-amber-400 text-amber-500" : "text-slate-300"}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRatingSubmit}
                  disabled={isSubmittingRating || selectedRating === 0}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingRating ? "Submitting..." : "Submit rating"}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

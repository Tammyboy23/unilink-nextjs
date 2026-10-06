"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { MapPin, RotateCcw, Search, Star , PackageOpen} from "lucide-react";
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

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch("/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const schools = Array.from(
    new Set(products.map((product) => product.school).filter(Boolean))
  ).sort((first, second) => first.localeCompare(second));
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  ).sort((first, second) => first.localeCompare(second));
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !normalizedQuery ||
      `${product.title} ${product.description}`.toLowerCase().includes(normalizedQuery);
    const matchesSchool = !selectedSchool || product.school === selectedSchool;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = !maxPrice || Number(product.price) <= Number(maxPrice);

    return matchesSearch && matchesSchool && matchesCategory && matchesPrice;
  });

  function clearFilters() {
    setSearchQuery("");
    setSelectedSchool("");
    setSelectedCategory("");
    setMaxPrice("");
  }

  return (
    <>
      <Navbar />

      <main className="mb-20 mt-20 min-h-screen bg-white px-25 max-md:px-3">
        <span className="flex min-h-11 w-full mt-4 mb-2 items-center gap-2 rounded-full border border-slate-300 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
              <Search aria-hidden="true" size={17} className="shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name or description"
                className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-slate-400"
              />
            </span>
        <div className="relative isolate flex flex-col gap-2 overflow-hidden rounded-xl bg-emerald-600 p-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/20 bg-emerald-700"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-16 h-72 w-72 rounded-full border border-white/15 bg-emerald-500"
          />

          <p className="relative z-10 font-[600] font-oswald text-emerald-200 max-md:text-sm">
            STUDENT PRODUCTS & SERVICES
          </p>

          <h1 className="relative z-10 text-4xl font-bold text-white font-outfit max-md:text-2xl">
            Find Students <br />
            at your next campus
          </h1>

          <p className="relative z-10 text-emerald-200 max-md:text-sm">
            Electronics, Clothes, Services, and more — from verified students
          </p>
        </div>

        <section
          aria-label="Search and filter products"
          className="mt-6 flex gap-3 rounded-xl"
        >
          {/* FILTER SECTION */}
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            <select
              value={selectedSchool}
              onChange={(event) => setSelectedSchool(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 px-2"
            >
              <option value="">All schools</option>
              {schools.map((school) => (
                <option key={school} value={school} className="font-inter font-black w-full">
                  {school}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="font-inter font-black w-full">
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            <input
              type="number"
              min="0"
              step="1"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max Price"
              className="min-h-11 w-full rounded-full border border-slate-300 bg-white px-3 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!searchQuery && !selectedSchool && !selectedCategory && !maxPrice}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </section>

        {loading ? (
          <div className="mt-10 flex min-h-[200px] items-center justify-center">
            <p className="text-lg font-semibold text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-10 flex flex-col gap-4 min-h-[200px] items-center justify-center">
            < PackageOpen size={48} strokeWidth={1.5}/>
            <p className="text-lg font-semibold text-gray-500">No products found.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="mt-10 flex  flex-col gap-4 min-h-[200px] flex-col items-center justify-center gap-3 text-center">
            < PackageOpen size={48} strokeWidth={1.5}/>
            <p className="text-lg font-semibold text-gray-700">No listings match these filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-3 gap-8 max-md:grid-cols-2 max-md:gap-3">
            {filteredProducts.map((product, index) => (
              <Link
                href={`/marketplace/${product.id}`}
                key={`${product.id}-${index}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-4 py-1.5 text-[12px] font-semibold text-white font-outfit max-md:text-[10px]">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 max-md:p-3">
                  <p className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 font-rubik max-md:text-[10px]">
                    <MapPin size={15} className="text-emerald-500" />
                    {product.school}
                  </p>

                  <h2 className="mt-2 truncate text-xl font-semibold text-emerald-500 max-md:text-lg font-black font-inter">
                    {product.title}
                  </h2>

                  <hr className="mt-2 border-gray-200" />

                  <div className="mt-3 flex items-center justify-between">
                    <h3 className="text-2xl font-black font-inter text-gray-900 max-md:text-base">
                      &#8358;{Number(product.price).toLocaleString()}
                    </h3>

                    <span className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-700 max-md:text-xs">
                      <Star size={14} fill="currentColor" className="text-yellow-500" />
                      {product.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
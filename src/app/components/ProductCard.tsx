import Link from "next/link";
import { MapPin, Star } from "lucide-react";

type ProductCardProps = {
  id: number;
  img: string;
  ratings: number;
  name: string;
  price: number;
  category: string;
  school?: string;
};

export default function ProductCard({
  id,
  img,
  ratings,
  name,
  price,
  category,
  school = "Campus",
}: ProductCardProps) {
  return (
    <Link
      href={`/marketplace/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
            No image
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-emerald-600 shadow-sm">
          {category}
        </span>
      </div>

      <div className="p-4 max-md:p-3">
        <p className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 font-rubik max-md:text-[10px]">
          <MapPin size={15} className="text-emerald-500" />
          {school}
        </p>

        <h2 className="mt-2 truncate text-xl font-semibold text-emerald-500 max-md:text-lg font-black font-inter">
          {name}
        </h2>

        <hr className="mt-2 border-gray-200" />

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-2xl font-black font-inter text-gray-900 max-md:text-base">
            &#8358;{Number(price).toLocaleString()}
          </h3>

          <span className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-700 max-md:text-xs">
            <Star size={14} fill="currentColor" className="text-yellow-500" />
            {Number(ratings || 0).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
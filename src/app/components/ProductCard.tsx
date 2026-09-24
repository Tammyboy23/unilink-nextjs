import Link from "next/link";

type ProductCardProps = {
  id: number;
  img: string;
  ratings: number;
  name: string;
  price: number;
  category: string;
};

export default function ProductCard({
  id,
  img,
  ratings,
  name,
  price,
  category,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        {img ? (
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-emerald-300">
            No image
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm backdrop-blur">
          {category}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        <div
          className="flex items-center gap-0.5"
          aria-label={`${ratings} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 ${
                i < Math.round(ratings) ? "text-amber-400" : "text-gray-200"
              }`}
            >
              <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            </svg>
          ))}
          <span className="ml-1.5 text-sm font-medium text-gray-600">
            {ratings.toFixed(1)}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900">
          {name}
        </h3>

        {/* Price + CTA pinned to the bottom */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-xl font-bold text-emerald-700">
            &#8358;{price.toLocaleString()}
          </p>

          <Link
            href={`/marketplace/${id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            View
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
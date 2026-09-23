type ProductCardProps = {
    name: string;
    price: number;
    category: string;
};

export default function ProductCard({
    name,
    price,
    category,
}: ProductCardProps) {
    return(
        <div className="rounded-xl border p-4">
            <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-gray-400">Image</span>
            </div>
            <p className="text-sm text-gray-500">{category}</p>
            <h1 className="mt-1 text-lg font-semibold">{name}</h1>

            <p className="mt-2 font-bold">
                &#8358;{price.toLocaleString()}
            </p>
            <button className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white">
                View Product
            </button>

        </div>
    );
}
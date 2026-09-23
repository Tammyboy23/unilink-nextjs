import ProductCard from "../components/ProductCard"

export default function Marketplace(){
    return(
        <main className="p-6">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <ProductCard 
                    id="iphone-13"
                    name="iphone 13"
                    price={450000}
                    category="Electronics"
                />
                <ProductCard 
                    id="calculator"
                    name="Engineering Calculator"
                    price={15000}
                    category="School Supplies"
                />
                <ProductCard 
                    id="nike-sneakers"
                    name="Nike sneakers"
                    price={35000}
                    category="Fashion"
                />
            </div>
        </main>
    )
}
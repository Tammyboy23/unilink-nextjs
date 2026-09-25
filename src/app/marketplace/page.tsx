import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import { LocateIcon, MapPin , Star} from "lucide-react"

type Product = {
    id: number;
    title: string;
    img: string;
    rating: number;
    category: string;
    school: string;
    price: number;
}

const products: Product[] = [
    {
        id: 1,
        title:"Iphone 16",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB3mgmv8zrCtXB_kDFZfCAPQZVFjUXqVdMtFzWzjliFQ&s=10",
        rating: 5,
        category: "Electronics",
        school:"Babcock University",
        price: 1805600
    },
    {
        id: 2,
        title: "Macbook M4 Air",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_zunn_YmCMKScR7kj62PdFP6WPDuVtsoDFbcAnV-4w&s=10",
        rating: 4.5,
        category: "Electronics",
        school: "Lead City University",
        price: 1459000
    },
    {
        id: 3,
        title: "Oraimo Airbuds",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR481Ul0SF57IHh3a3nC61l_JJSldFaVr-02di91kv2zQ&s=10",
        rating: 4,
        category: "Electronics",
        school:"UNILAG",
        price: 28000
    },
    {
        id:4,
        title:"Jordan 4 Military Black",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29ckZOh4PPlj0MGetF3WJkXbUjzg8kXHI3amF30TTnQ&s=10",
        rating: 5,
        category:"Shoes",
        school: "Caleb University",
        price: 20000
    }
]

export default function Marketplace(){
    return(
        <>
        <Navbar />
        <main className="p-6 bg-white min-h-screen mt-20 px-25 max-md:px-5 mb-20">
            {/* TOP HEADER */}
            <div className="flex flex-col gap-2 bg-emerald-600 rounded-xl p-6">
            <p className="text-emerald-200 font-[600] font-oswald">STUDENT SERVICES</p>   
            <h1 className="text-white font-outfit font-bold text-4xl">Find Skilled Students <br /> at your next campus</h1> 
            <p className="text-emerald-200">Tutoring, Creative work, and more - from verified Students</p>
            </div>
            {/* PRODUCTS GRID SECTION */}
            <div className="grid grid-cols-3 max-md:grid-cols-1 mt-20  gap-8">
           {products.map((product,index) => (
                <div className="border border-gray-300 shadow-lg flex flex-col group rounded-xl transition duration-300 overflow-hidden hover:-translate-y-1" key={index}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={product.img} alt={product.img} className="w-full h-full group-hover:scale-105 transition duration-300" />
                        <span className=" absolute top-3 left-3 bg-emerald-600 rounded-full py-1.5 px-4 text-[12px] text-white font-semibold font-outfit">{product.category}</span>
                    </div>
                    <div className="p-4">
                        <p className="text-[12px] text-gray-700 font-semibold font-rubik flex gap-2"><MapPin size={15} className="text-emerald-500" />{product.school}</p>
                        <h1 className="text-1.5xl font-semibold font-outfit mt-2 text-emerald-500">{product.title}</h1>
                        <hr className="border-gray-200 mt-2"/>
                        <div className="flex justify-between mt-2">
                            <h1 className="font-bold font-outfit text-3xl font-inter">&#8358;{product.price.toLocaleString()}</h1>
                            <h1 className="flex gap-2 items-center font-semibold font-rubik bg-yellow-50 border border-yellow-400 rounded-lg p-2 text-brown-600 font-jetbrains"><Star size={15} fill="currentColor" className="text-yellow-500" />{product.rating}</h1>
                        </div>
                        <button className="flex w-full bg-emerald-500 mt-3 text-center items-center justify-center text-white py-2 font-outfit font-semibold rounded-lg">Get Details</button>
                    </div>
                </div>
           ))}
        </div>            
        </main>
        
        </>
    )
}
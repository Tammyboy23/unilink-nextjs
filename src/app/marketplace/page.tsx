import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Link from "next/link"
import { ShoppingCart , MapPin , Star} from "lucide-react"

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
    },
    {
    id: 5,
    title: "Calculus: Early Transcendentals (8th Edition)",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    category: "Textbooks",
    school: "University of Lagos",
    price: 25000,
  },
  {
    id: 6,
    title: "TI-84 Plus CE Graphing Calculator",
    img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    category: "Electronics",
    school: "University of Lagos",
    price: 60000,
  },
  {
    id: 7,
    title: "1-on-1 Calculus & Statistics Tutoring (per hour)",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    category: "Tutoring",
    school: "University of Lagos",
    price: 15,
  },
  {
    id: 8,
    title: "Laptop & Phone Screen Repair Service",
    img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    category: "Tech Repair",
    school: "University of Lagos",
    price: 20,
  },
]

export default function Marketplace(){
    return(
        <>
        <Navbar />
        <main className="p-6 bg-white min-h-screen mt-20 px-25 max-md:px-3 mb-20">
            {/* TOP HEADER */}
            <div className="relative isolate flex flex-col gap-2 overflow-hidden rounded-xl bg-emerald-600 p-6">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/20 bg-emerald-700" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-16 h-72 w-72 rounded-full border border-white/15 bg-emerald-500" />
            <p className="relative z-10 text-emerald-200 font-[600] font-oswald max-md:text-sm ">STUDENT SERVICES</p>   
            <h1 className="relative z-10 text-white font-outfit font-bold text-4xl max-md:text-2xl ">Find Skilled Students <br /> at your next campus</h1> 
            <p className="relative z-10 text-emerald-200 max-md:text-sm">Tutoring, Creative work, and more - from verified Students</p>
            </div>
            {/* PRODUCTS GRID SECTION */}
            <div className="grid grid-cols-3 max-md:grid-cols-2 mt-20  gap-8 max-md:gap-3">
           {products.map((product,index) => (
                <Link href={`/marketplace/${product.id}`}className="border border-gray-300 shadow-lg flex  flex-1 flex-col group rounded-xl transition duration-300 overflow-hidden hover:-translate-y-1" key={index}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={product.img} alt={product.img} className="w-full h-full group-hover:scale-105 transition duration-300" />
                        <span className=" absolute top-3 left-3 bg-emerald-600 rounded-full py-1.5 px-4 text-[12px] max-md:text-xs text-white font-semibold font-outfit">{product.category}</span>
                    </div>
                    <div className="p-4 max-md:p-2">
                        <p className="text-[12px] text-gray-700 font-semibold font-rubik flex gap-2 max-md:text-[10px] max-md:gap-1.5"><MapPin size={15} className="text-emerald-500" />{product.school}</p>
                        <h1 className="text-1.5xl font-semibold font-inter truncate mt-2 text-emerald-500">{product.title}</h1>
                        <hr className="border-gray-200 mt-1"/>
                        <div className="flex justify-between mt-1">
                            <h1 className="font-bold font-outfit text-3xl font-outfit max-md:text-base">&#8358;{product.price.toLocaleString()}</h1>
                            <h1 className="flex gap-2 items-center font-semibold font-rubik bg-yellow-50 border border-yellow-400 rounded-lg p-2 text-brown-600 font-jetbrains hidden max-md:blocked"><Star size={15} fill="currentColor" className="text-yellow-500" />{product.rating}</h1>
                        </div>
                        {/* <Link href={`/marketplace/${product.id}`} className="flex w-full bg-emerald-50 border border-emerald-500 mt-3 text-center items-center justify-center text-emerald-800 py-2 font-outfit font-semibold rounded-xl gap-2 font-outfit hover:bg-emerald-500 hover:text-white"><ShoppingCart size={17}/> Get Item</Link> */}
                    </div>
                </Link>
           ))}
        </div>            
        </main>
        
        </>
    )
}
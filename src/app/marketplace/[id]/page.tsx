import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Bookmark, MapPin, MoveLeft, Share2,School, MessageCircleMore, MessageSquare, MessagesCircle} from "lucide-react";

type ProductPageProps = {
    params: Promise<{
        id: string
    }>;
};
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

export default async function ProductPage({
    params,
}: ProductPageProps){
    const {id} = await params;
    const current = products.find(product => product.id === Number(id))

    return(
        <>
        <Navbar />
        <main className="p-6 bg-white min-h-screen mt-20 px-25 max-md:px-5 mb-20">
            {/* TOP STUFF */}
            <div className="flex justify-between items-center">
                <Link href="/marketplace" className="flex gap-2 border px-4 py-1.5 rounded-lg font-outfit font-semibold hover:bg-emerald-50 hover:text-emerald-600"><ArrowLeft /></Link>
                <div className="flex gap-4">
                    <button className="flex gap-2 border rounded-full items-center justify-center px-4 py-1.5 hover:bg-emerald-50 hover:text-emerald-600 font-jetbrains font-semibold"><Bookmark /></button>
                    <button className="flex gap-2 border rounded-full items-center justify-center px-4 py-1.5 hover:bg-emerald-50 hover:text-emerald-600 font-jetbrains font-semibold"><Share2 /></button>
                </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden mt-4 border border-gray-200 rounded-xl">
                <img src={current?.img} alt={current?.img} className="w-full h-full "/>
                <span className="absolute top-3 left-3 bg-emerald-600 text-white px-4 py-1.5 font-outfit font-semibold rounded-full">{current?.category}</span>
            </div>
            <div className="flex flex-col mt-8 gap-4">
                <p className="flex gap-2 bg-gray-100 rounded-full font-semibold border border-gray-500 w-fit px-4 py-1.5 max-md:text-base"><School />{current?.school}</p>
                <h1 className="text-5xl font-cabin font-bold max-md:text-[35px]">{current?.title}</h1>
                <h1 className="text-emerald-600 font-inter text-6xl font-bold max-md:text-[30px]">&#8358;{current?.price.toLocaleString()}</h1>
                <button className="w-full flex justify-center bg-emerald-600 text-white rounded-xl py-4 gap-2 text-base font-outfit border border-white font-semibold hover:bg-emerald-100 hover:border-emerald-600 hover:text-emerald-600"><MessagesCircle size={25}/>Contact Seller</button>
            </div>
        </main>
        </>
    )
}
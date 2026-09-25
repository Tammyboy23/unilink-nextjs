import Navbar from "./components/Navbar";
import { DollarSign , Box , TrendingUp, Eye} from "lucide-react";

type Stats = {
  color: string;
  title: string;
  amount: BigInteger;
  comment: string;
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-slate-900 pt-20 mb-20">
        <div className="flex flex-col w-full max-md:px-5  px-25 pt-10 gap-2">
          <p className="text-emerald-500 font-oswald font-semibold ">DASHBOARD</p> 
          <h1 className="text-4xl font-outfit font-semibold">Good Afternoon, Tammy</h1>  
          <p className="font-500 text-gray-500">{new Date().toLocaleDateString("en-US",{weekday: "long", day: "2-digit", month: "short", year: "numeric"})}</p>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 px-25 max-md:px-5 mt-10 gap-6 mb-2">
          <div className="flex flex-col border shadow-lg rounded-xl p-6 gap-2">
            <span className="flex items-center justify-center bg-emerald-100 text-emerald-600 w-fit p-2 rounded-lg"><DollarSign /></span>
            <p className="font-outfit gray-500 text-sm">Total Earned</p>
            <h1 className="text-4xl sm:text-2xl font-semibold font-rubik">&#8358;245,300</h1>
            <p className="text-sm text-gray-500 font-outfit">+&#8358;50,000 this month</p>
          </div>  
          <div className="flex flex-col border shadow-lg rounded-xl p-6 gap-2">
            <span className="flex items-center justify-center bg-emerald-100 text-emerald-600 w-fit p-2 rounded-lg"><Box /></span>
            <p className="font-outfit gray-500 text-sm">Active Services</p>
            <h1 className="text-4xl font-semibold font-rubik">25</h1>
            <p className="text-sm text-gray-500 font-outfit">Coaching & Tutoring</p>
          </div>  
          <div className="flex flex-col border shadow-lg rounded-xl p-6 gap-2">
            <span className="flex items-center justify-center bg-blue-100 text-blue-600 w-fit p-2 rounded-lg"><TrendingUp /></span>
            <p className="font-outfit gray-500 text-sm">Total Sessions</p>
            <h1 className="text-4xl font-semibold font-rubik">10</h1>
            <p className="text-sm text-gray-500 font-outfit">+3 this month</p>
          </div>  
          <div className="flex flex-col border shadow-lg rounded-xl p-6 gap-2">
            <span className="flex items-center justify-center bg-orange-100 text-orange-600 w-fit p-2 rounded-lg"><Eye /></span>
            <p className="font-outfit gray-500 text-sm">Profile Views</p>
            <h1 className="text-4xl font-semibold font-rubik">248</h1>
            <p className="text-sm text-gray-500 font-outfit">+13 this month</p>
          </div>  
        </div>     
      </main>
    </>
  );
}
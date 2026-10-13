import HeroCarosel from "./components/HeroCarosel";
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

      <main className="min-h-screen bg-white text-slate-900 px-25 max-md:px-5 pt-20 mb-20">
        <HeroCarosel /> 
      </main>
    </>
  );
}
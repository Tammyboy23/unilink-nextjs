"use client";
import Navbar from "../components/Navbar"
import { Camera , GraduationCap , School2 , Plus, Edit3, Share , Calendar} from "lucide-react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Profile =  {
        id: string;
        created_at: string;
        username: string;
        school: string;
        email: string;
        password: string;
        profile_pic: string;
        displayname: string;
    }

export default function Profile(){

    const [profile, setprofile] = useState<Profile | null>(null)
    useEffect(() =>{
        fetch("/api/profile")
        .then(res => res.json())
        .then((data) => {
            setprofile(data)
        })
    },[])
    return(
        <>
        <Navbar />
        <main className=" px-25 max-md:px-5 mt-25 mb-20">
            <div className="overflow-hidden rounded-xl bg-white">
                    {/* BANNER */}
                <div className="relative h-36 max-md:h-26 bg-emerald-500">
                    <span className="absolute top-3 right-3 border flex justify-center items-center gap-2 px-4 py-1.5 border-white text-white font-outfit font-semibold rounded-xl text-sm hover:bg-white/60"><Camera color="white" size={16}/> Edit Cover</span>
                </div>
                {/* PROFILE & INFO e.g NAME, SCHOOL e.t.c */}
                <div className="px-20 max-md:px-5 flex flex-col gap-10 max-md:gap-6 -mt-20 max-md:-mt-10">
                    {/* IMAGE */}
                    <div className="relative overflow-hidden w-40 h-40 max-md:h-20 max-md:w-20 border-3 border-white rounded-full">
                        {profile?.profile_pic ? (<img src={profile?.profile_pic} alt="" className=" w-full h-full " />) : (<span className="flex w-full h-full bg-emerald-400 text-4xl font-bold items-center justify-center text-white">{profile?.username[0].toUpperCase()}</span>)}
                    </div>
                    {/* PROFILE INFO */}
                    <div className="flex flex-col gap-4 max-md:gap-2">
                        <h1 className="text-4xl font-cabin font-bold max-md:text-3xl" >{profile?.displayname || profile?.username}</h1>
                        <p className="font-rubik text-gray-500 font-semibold">@{profile?.username}</p>
                        <span className="flex items-center gap-2 text-gray-500 font-semibold" ><School2 className="text-emerald-600" />{profile?.school}</span>
                        <p className="flex gap-2"> <Calendar />{new Date(profile?.created_at).toLocaleDateString("en-US",{month:"long",day:"2-digit",year: "numeric"})}</p>
                    </div>
                    
                </div>
                
                {/* ACTION BUTTONS */}
                <div className="mt-4 flex flex-wrap items-center gap-2 px-20 max-md:px-5">
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-outfit text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 max-md:flex-1 max-md:px-3">
                        <Plus size={16} />
                        Post
                    </button>

                    <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 font-outfit text-sm font-semibold text-slate-700 transition hover:bg-slate-200 max-md:flex-1 max-md:px-3">
                        <Edit3 size={16} />
                        Edit Profile
                    </button>

                    <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 max-md:h-10 max-md:w-10">
                        <Share size={16} />
                    </button>
                </div>
                <hr className="mt-6 border-gray-300 "/>
            </div>
        </main>
        </>
    )
}
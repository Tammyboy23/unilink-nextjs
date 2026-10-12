"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Building2, GraduationCap, LockKeyhole, Mail, ShoppingBag, UserRound } from "lucide-react";

type AuthFormProps = { mode: "login" | "signup" };

const inputClassName = "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

const schoolOptions = [
    "Abia State University",
    "Adamawa State University",
    "Adeleke University",
    "Adekunle Ajasin University",
    "Adeyemi Federal University of Education",
    "Afe Babalola University",
    "Ahmadu Bello University",
    "Ahman Pategi University",
    "Air Force Institute of Technology",
    "Ajayi Crowther University",
    "Aletheia University",
    "Alex Ekwueme Federal University",
    "Al-Hikmah University",
    "Al-Istiqama University",
    "Aliko Dangote University of Science and Technology",
    "Al-Muhibbah Open University",
    "Alvan Ikoku Federal University of Education",
    "Ambrose Alli University",
    "American Open University",
    "American University of Nigeria",
    "Amaj University",
    "Anan University",
    "Anchor University",
    "Arthur Jarvis University",
    "Atiba University",
    "Augustine University",
    "Ave Maria University",
    "Azman University",
    "Babcock University",
    "Bamidele Olumilua University of Education, Science and Technology",
    "Bayero University",
    "Baze University",
    "Bayelsa Medical University",
    "Bells University of Technology",
    "Benson Idahosa University",
    "Benue State University of Agriculture, Science and Technology",
    "Bingham University",
    "Borno State University",
    "Bowen University",
    "British Canadian University",
    "Bridget University",
    "Caldwell University",
    "Caleb University",
    "Canadian University of Nigeria",
    "Capital City University",
    "Caritas University",
    "Chrisland University",
    "Christopher University",
    "Chukwuemeka Odumegwu Ojukwu University",
    "City University",
    "Claretians University of Nigeria",
    "Clifford University",
    "Coal City University",
    "College of Petroleum and Energy Studies",
    "Confluence University of Science and Technology",
    "Covenant University",
    "Cosmopolitan University",
    "Crawford University",
    "Crescent University",
    "Cross River University of Education and Entrepreneurship",
    "Cross River University of Technology",
    "Delta State University",
    "Dennis Osadebay University",
    "Dominican University",
    "Dominion University",
    "Edo University",
    "Edusoko University",
    "Edwin Clark University",
    "Eko University of Medical Sciences",
    "Ekiti State University",
    "El-Amin University",
    "Elizade University",
    "Elrazi University of Medical Sciences",
    "Enugu State University of Medical and Applied Sciences",
    "Enugu State University of Science and Technology",
    "Eranova University",
    "European University of Nigeria",
    "Euston University",
    "Evangel University",
    "Federal University of Agriculture",
    "Federal University of Agriculture and Climate Action",
    "Federal University of Agriculture and Developmental Studies",
    "Federal University of Agriculture and Technology",
    "Federal University of Allied Health Sciences",
    "Federal University of Applied Sciences",
    "Federal University of Education",
    "Federal University of Environment and Technology",
    "Federal University of Health Science and Technology",
    "Federal University of Health Sciences",
    "Federal University of Medicine and Medical Sciences",
    "Federal University of Petroleum Resources",
    "Federal University of Science and Technology",
    "Federal University of Technology",
    "Federal University of Transportation",
    "Federal University",
    "First Technical University",
    "Fountain University",
    "Franco British International University",
    "Gashua Federal University",
    "Gerar University of Medical Sciences",
    "Glorious Vision University",
    "Godday Erewa University",
    "Godfrey Okoye University",
    "Goldmark University",
    "Gombe State University",
    "Gregory University",
    "Greenfield University",
    "Greenland University",
    "Hallmark University",
    "Havilla University",
    "Hezekiah University",
    "Hensard University",
    "High-Flyers University",
    "Hillside University of Science and Technology",
    "Huda University",
    "Ibrahim Badamasi Babangida University",
    "Igbinedion University",
    "Ignatius Ajuru University of Education",
    "Imo State University",
    "Isaac Balami University of Aeronautics and Management",
    "JEFAP University",
    "James Hope University",
    "Jewel University",
    "Joseph Ayo Babalola University",
    "Joseph Sarwuan Tarka University",
    "Kaduna State University",
    "Karl-Kumm University",
    "Kebbi State University of Science and Technology",
    "Kevin Eze University",
    "Khalifa Isiyaku Rabiu University",
    "Kings University",
    "Kingsley Ozumba Mbadiwe University",
    "Kogi State University",
    "Kola Daisi University",
    "Kwararafa University",
    "Kwara State University",
    "Kwara State University of Education",
    "Ladoke Akintola University of Technology",
    "Lagos State University",
    "Lagos State University of Education",
    "Lagos State University of Science and Technology",
    "Landmark University",
    "Leadership University",
    "Legacy University",
    "Lens University",
    "Lighthouse University",
    "Lux Mundi University",
    "Madonna University",
    "Maduka University",
    "Maranatha University",
    "Margaret Lawrence University",
    "Maryam Abacha American University of Nigeria",
    "Michael and Cecilia Ibru University",
    "Michael Okpara University of Agriculture",
    "Miva Open University",
    "Modibbo Adama University",
    "Monarch University",
    "Mountain Top University",
    "Mudiame University",
    "Muhammad Kamalud-Deen University",
    "Nasarawa State University",
    "National Open University of Nigeria",
    "National University of Science and Technology",
    "New City University",
    "Newgate University",
    "Niger Delta University",
    "Nigerian Army University",
    "Nigerian British University",
    "Nigerian Defence Academy",
    "Nigerian Maritime University",
    "Nigerian Police Academy",
    "Nigerian University of Technology and Management",
    "Nile University of Nigeria",
    "North Eastern University",
    "Northwest University",
    "Novena University",
    "Nnamdi Azikiwe University",
    "Obafemi Awolowo University",
    "Obong University",
    "Oduduwa University",
    "Ojaja University",
    "Olabisi Onabanjo University",
    "Olusegun Agagu University of Science and Technology",
    "Omega University",
    "Ondo State University of Medical Sciences",
    "Owolabi University",
    "PAMO University of Medical Sciences",
    "Pan-Atlantic University",
    "Paul University",
    "Peaceland University",
    "Pearl University",
    "Peter University",
    "Philomath University",
    "Phoenix University",
    "Plateau State University",
    "Precious Cornerstone University",
    "Prime University",
    "Prince Abubakar Audu University",
    "Renaissance University",
    "Redeemer's University",
    "Regnum Medical University",
    "Rev. Fr. Moses Orshio Adasu University",
    "Rhema University",
    "Ritman University",
    "Rivers State University",
    "Sa'adu Zungur University",
    "Salisu University",
    "Sani Bello University",
    "Saisa University of Medical Sciences and Technology",
    "Salem University",
    "Sam Maris University",
    "Sule Lamido University",
    "Shehu Shagari University of Education",
    "Shanahan University",
    "Skyline University",
    "Southwestern University",
    "Southern Atlantic University",
    "Spiritan University",
    "Sports University",
    "Summit University",
    "Tansian University",
    "Taraba State University",
    "Taraba State University of Tropical Agriculture, Science, Technology and Climate Action",
    "Tazkiyah University",
    "The Duke Medical University",
    "Thomas Adewumi University",
    "Tonnie Iredia University of Communication",
    "Topfaith University",
    "Transatlantic University of Medicine and Health Sciences",
    "Trinity University",
    "Umaru Musa Yar'Adua University",
    "Ummah University of Nigeria",
    "Unique Open University",
    "University of Abuja",
    "University of Africa",
    "University of Agriculture and Environmental Sciences",
    "University of Benin",
    "University of Calabar",
    "University of Delta",
    "University of Education",
    "University of Fortune",
    "University of Ilesa",
    "University of Ilorin",
    "University of Innovation, Science and Technology",
    "University of Jos",
    "University of Lagos",
    "University of Maiduguri",
    "University of Mkar",
    "University of Nigeria",
    "University of Port Harcourt",
    "University of Science and Technology",
    "University on the Niger",
    "University of Uyo",
    "University of Ibadan",
    "Usmanu Danfodiyo University",
    "Veritas University",
    "Venite University",
    "Wellspring University",
    "Western Delta University",
    "Wesley University",
    "Westland University",
    "Wigwe University",
    "Yobe State University",
    "Yusuf Maitama Sule Federal University of Education",
    "Zamfara State University",
    "University of Agriculture and Environmental Sciences"
];

export default function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const isSignup = mode === "signup";
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (isSignup && password !== confirmPassword) {
            setError("Your passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:3000/api/auth/${mode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(isSignup ? { email, username, school, password } : { email, password }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error ?? result.message ?? "Something went wrong.");
            }
            if (isSignup) {
                setSuccess("Your account is ready. Sign in to continue.");
            } else {
                router.replace("/");
            }
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Unable to connect. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f5f7f4] p-3 sm:p-6 lg:p-10">
            <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.10)] sm:min-h-[calc(100svh-3rem)] lg:grid-cols-[0.95fr_1.05fr]">
                <aside className="relative isolate flex min-h-52 flex-col justify-between overflow-hidden bg-emerald-800 p-6 text-white sm:min-h-64 sm:p-9 lg:min-h-full lg:p-12">
                    <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full border border-white/15" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-20 -z-10 h-96 w-96 rounded-full border border-white/10" />
                    <Link href="/" className="flex w-fit items-center gap-2.5">
                        <Image src="/logo.png" width={38} height={38} alt="" className="h-9 w-9 rounded-lg object-contain" />
                        <span className="font-inter text-xl font-bold">Uni<span className="text-emerald-200">link</span></span>
                    </Link>
                    <div className="mt-10 max-w-md lg:mt-0">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200"><GraduationCap size={17} /> Made for campus life</p>
                        <h1 className="font-outfit text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Your campus community, all in one place.</h1>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-100 sm:text-base">Find what you need, share what you know, and connect with students around you.</p>
                        <div className="mt-7 hidden items-center gap-3 border-t border-white/15 pt-5 sm:flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><ShoppingBag size={19} /></div>
                            <div><p className="text-sm font-semibold">A marketplace that feels local</p><p className="mt-0.5 text-xs text-emerald-100">Buy, sell, and discover on campus</p></div>
                        </div>
                    </div>
                </aside>

                <section className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14">
                    <div className="w-full max-w-md">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{isSignup ? "Join the community" : "Welcome back"}</p>
                        <h2 className="mt-3 font-outfit text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{isSignup ? "Create your account" : "Sign in to Unilink"}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{isSignup ? "Set up your student profile to get started." : "Your campus marketplace is just a sign in away."}</p>

                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            {isSignup && <>
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">Username</span>
                                    <span className="relative block"><UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete="username" className={inputClassName} name="username" onChange={(event) => setUsername(event.target.value)} placeholder="Your name on Unilink" required value={username} /></span>
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-semibold text-slate-700">School</span>
                                    <span className="relative block"><Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete="organization" className={inputClassName} list="school-options" name="school" onChange={(event) => setSchool(event.target.value)} placeholder="Search or select your university" required value={school} /></span>
                                    <datalist id="school-options">
                                        {schoolOptions.map((schoolName) => {
                                            const shortName = schoolName.split(",")[0].trim();
                                            return <option key={schoolName} value={shortName} />;
                                        })}
                                    </datalist>
                                </label>
                            </>}
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Email address</span>
                                <span className="relative block"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete="email" className={inputClassName} name="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" required type="email" value={email} /></span>
                            </label>
                            <label className="block">
                                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Password</span>
                                <span className="relative block"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete={isSignup ? "new-password" : "current-password"} className={inputClassName} minLength={8} name="password" onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required type="password" value={password} /></span>
                            </label>
                            {isSignup && <label className="block">
                                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Confirm password</span>
                                <span className="relative block"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete="new-password" className={inputClassName} name="confirmPassword" onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter your password again" required type="password" value={confirmPassword} /></span>
                            </label>}

                            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">{error}</p>}
                            {success && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800">{success}</p>}
                            <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
                                {isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}{!isSubmitting && <ArrowRight size={17} />}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">{isSignup ? "Already have an account?" : "New to Unilink?"}{" "}<Link className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900" href={isSignup ? "/login" : "/signup"}>{isSignup ? "Sign in" : "Create an account"}</Link></p>
                    </div>
                </section>
            </div>
        </main>
    );
}
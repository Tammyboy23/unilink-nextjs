"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Building2, GraduationCap, LockKeyhole, Mail, ShoppingBag, UserRound } from "lucide-react";

type AuthFormProps = { mode: "login" | "signup" };

const inputClassName = "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

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
            const response = await fetch(`/api/auth/${mode}`, {
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
                                    <span className="relative block"><Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" /><input autoComplete="organization" className={inputClassName} name="school" onChange={(event) => setSchool(event.target.value)} placeholder="Your university" required value={school} /></span>
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
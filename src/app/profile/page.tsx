"use client";

import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import {
  Camera,
  School,
  Plus,
  Edit3,
  Share,
  Calendar,
  LogOut,
  TriangleAlert,
  X,
  PenBoxIcon,
  Check,
  Trash
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

type Profile = {
  id: string;
  created_at: string;
  username: string;
  school: string;
  email: string;
  password: string;
  profile_pic: string;
  displayname: string;
  phone?: string;
};

type UserListing = {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
  school: string;
  price: number;
  user_id: number;
  phone: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [displayname, setDisplayname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [phone, setPhone] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState("");
  const [posting, setposting] = useState(false);
  const [listingForm, setListingForm] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    description: "",
    phone: ""
  });
  const [listingError, setListingError] = useState("");
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);
  const [postSucess, setPostSucess] = useState(false);
  const [myListings, setMyListings] = useState<UserListing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [listingsRefreshKey, setListingsRefreshKey] = useState(0);

  async function getProfile(): Promise<Profile> {
    const res = await fetch("/api/profile")
    if (!res.ok){
        throw new Error("Failed to Fetch Profile")
    }
    const data = await res.json()
    return data;
  }

  const{ data: profile, refetch, isLoading: isLoadingProfile } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,

    staleTime: 1000 * 60 * 50,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isLoadingProfile) return;

    if (!profile?.id) {
      setMyListings([]);
      setIsLoadingListings(false);
      return;
    }

    let active = true;

    async function fetchUserListings() {
      setIsLoadingListings(true);

      try {
        const response = await fetch(
          `/api/product?userId=${encodeURIComponent(profile.id)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your listings.");
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The listings response has an unexpected format.");
        }

        if (active) setMyListings(data as UserListing[]);
      } catch (error) {
        if (active) {
          console.error("Failed to fetch user listings:", error);
          setMyListings([]);
        }
      } finally {
        if (active) setIsLoadingListings(false);
      }
    }

    void fetchUserListings();

    return () => {
      active = false;
    };
  }, [isLoadingProfile, profile?.id, listingsRefreshKey]);

  function openEditProfile() {
    setDisplayname(profile?.displayname ?? "");
    setProfilePic(profile?.profile_pic ?? "");
    setPhone(profile?.phone ?? "");
    setProfileSaveError("");
    setEditProfile(true);
  }


  async function confirmLogout() {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }
      refetch()
      router.replace("/login");
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );
      setIsLoggingOut(false);
    }
  }
  async function saveEdits() {
    setIsSavingProfile(true);
    setProfileSaveError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayname: displayname.trim(),
          profile_pic: profilePic.trim(),
          phone: phone.trim(),
          id: profile?.id,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Failed to save profile.");
      }

      await refetch();
      setEditProfile(false);
      setPostSucess(true);
      router.refresh();
    } catch (error) {
      setProfileSaveError(
        error instanceof Error ? error.message : "Failed to save profile. Please try again."
      );
    } finally {
      setIsSavingProfile(false);
    }
  }

  function resetListingForm() {
    setListingForm({
      title: "",
      category: "",
      price: "",
      image: "",
      description: "",
      phone: ""
    });
    setListingError("");
  }

  async function handleSubmitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setListingError("");

    const trimmedTitle = listingForm.title.trim();
    const trimmedDescription = listingForm.description.trim();
    const trimmedImage = listingForm.image.trim();
    const trimmedCategory = listingForm.category.trim();
    const trimmedPhone = listingForm.phone.trim();
    const numericPrice = Number(listingForm.price);

    if (!trimmedTitle || !trimmedDescription || !trimmedImage || !trimmedCategory || !listingForm.price || !trimmedPhone || Number.isNaN(numericPrice) || numericPrice <= 0 || trimmedPhone.replace(/\D/g, "").length < 7) {
      setListingError("Please fill in every field with a valid price and phone number.");
      return;
    }

    setIsSubmittingListing(true);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          description: trimmedDescription,
          image: trimmedImage,
          category: trimmedCategory,
          price: numericPrice,
          phone: trimmedPhone
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Unable to publish your listing.");
      }
      setListingsRefreshKey((key) => key + 1);
      resetListingForm();
      setposting(false);
      router.refresh();
    } catch (error) {
      setListingError(
        error instanceof Error
          ? error.message
          : "Unable to publish your listing. Please try again."
      );
    } finally {
      setIsSubmittingListing(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="mb-20 mt-25 px-25 max-md:px-5">
        <div className="overflow-hidden rounded-xl bg-white pb-10">
          {/* BANNER */}
          <div className="relative isolate h-40 overflow-hidden bg-emerald-700 max-md:h-32">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-emerald-100/30 bg-emerald-500/50" />
            <span aria-hidden="true" className="pointer-events-none absolute right-44 top-20 h-40 w-40 rounded-full border border-emerald-100/25 bg-emerald-600/50 max-md:right-20" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full border border-white/15" />
            <span className="absolute right-4 top-4 flex items-center justify-center gap-2 rounded-lg border border-white/50 bg-emerald-950/10 px-3.5 py-2 font-outfit text-sm font-semibold text-white transition hover:bg-white/15">
              <Camera size={16} />
              Edit Cover
            </span>
          </div>

          {/* PROFILE & INFO */}
          <div className="mt-6 flex items-center gap-6 px-10 max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-emerald-100 shadow-lg max-md:h-24 max-md:w-24">
              {profile?.profile_pic ? (
                <img
                  src={profile.profile_pic}
                  alt={`${profile.username}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-emerald-600 font-outfit text-5xl font-bold text-white max-md:text-4xl">
                  {profile?.username?.[0]?.toUpperCase() ?? "U"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1 pb-1 max-md:pb-0">
              <p className="mb-1 font-outfit text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Student profile
              </p>
              <h1 className="break-words font-cabin text-4xl font-bold leading-tight text-slate-900 max-md:text-3xl">
                {profile?.displayname || profile?.username || "Your profile"}
              </h1>
              <p className="mt-1 font-inter text-sm font-semibold text-slate-500">
                {profile?.username ? `@${profile.username}` : ""}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {profile?.school && (
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-emerald-50 px-3 text-sm font-semibold text-emerald-800">
                    <School size={16} className="shrink-0 text-emerald-700" />
                    <span className="break-words">{profile.school}</span>
                  </span>
                )}
                {profile?.created_at && (
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-medium text-slate-600">
                    <Calendar size={16} className="shrink-0 text-slate-500" />
                    Joined {new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-4 flex flex-wrap items-center gap-2 px-20 max-md:px-5">
            <button
              type="button"
              onClick={() => {
                resetListingForm();
                setposting(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-outfit text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 max-md:flex-1 max-md:px-3"
            >
              <Plus size={16} />
              Post
            </button>

            <button
              type="button"
              onClick={openEditProfile}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 font-outfit text-sm font-semibold text-slate-700 transition hover:bg-slate-200 max-md:flex-1 max-md:px-3"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>

            <button
              type="button"
              aria-label="Share profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 max-md:h-10 max-md:w-10"
            >
              <Share size={16} />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 px-20 pt-5 max-md:px-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">My listings</p>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {myListings.length}
              </span>
            </div>

            {isLoadingListings ? (
              <p className="text-sm text-slate-500" role="status">
                Loading your listings...
              </p>
            ) : myListings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                You haven&apos;t posted any items yet. Use the Post button to add your first listing.
              </div>
            ) : (
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [&::-webkit-scrollbar]:hidden">
                {myListings.map((product) => (
                  <Link
                    key={product.id}
                    href={`/marketplace/${product.id}`}
                    className="group w-[min(72vw,260px)] flex-none snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {product.category}
                      </span>
                    </div>

                    <div className="space-y-2.5 p-3">
                      <div>
                        <h3 className="line-clamp-2 text-x1 truncate font-bold text-slate-900">
                          {product.title}
                        </h3>
                        <p className="flex items-center gap-2 mt-1 text-xs text-slate-500"><School size={16} className="shrink-0" />{product.school}</p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <span className="text-lg font-black text-emerald-600">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
                          <button
                            type="button"
                            aria-label={`Edit ${product.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
                          >
                            <PenBoxIcon size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${product.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-600"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-sm text-slate-500">Leaving UniLink on this device?</p>
            <button
              type="button"
              onClick={() => {
                setLogoutError("");
                setShowLogoutDialog(true);
              }}
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-outfit text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 max-md:w-full"
            >
              <LogOut size={17} />
              Log out
            </button>
          </div>
        </div>
      </main>

      {/* LOGOUT SCREEN */}
      {showLogoutDialog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) {
              setShowLogoutDialog(false);
            }
          }}
        >
          <section
            aria-labelledby="logout-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
            role="dialog"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <TriangleAlert size={21} />
              </div>
              <div className="min-w-0 flex-1">
                <h2
                  className="font-outfit text-xl font-bold text-slate-900"
                  id="logout-title"
                >
                  Log out of UniLink?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You&apos;ll need to sign in again to access your account and
                  campus marketplace.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutDialog(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {logoutError && (
              <p
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                {logoutError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutDialog(false)}
                className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={confirmLogout}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Confirm logout"}
              </button>
            </div>
          </section>
        </div>
      )}

      {/* EDIT PROFILE SCREEN */}
      {editProfile && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSavingProfile) {
              setEditProfile(false);
            }
          }}
        >
          <section
            aria-labelledby="edit-profile-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            role="dialog"
          >
            <h2
              id="edit-profile-title"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              Edit Profile <PenBoxIcon size={20} />
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Display name
                <input
                  type="text"
                  value={displayname}
                  onChange={(event) => setDisplayname(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                Profile picture URL
                <input
                  type="text"
                  value={profilePic}
                  onChange={(event) => setProfilePic(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>

            </div>

            {profileSaveError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {profileSaveError}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isSavingProfile}
                onClick={() => setEditProfile(false)}
                className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSavingProfile}
                onClick={saveEdits}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70"
              >
                {isSavingProfile && (
                  <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {isSavingProfile ? "Saving..." : "Save changes"}
              </button>
            </div>
          </section>
        </div>
      )}
      {/* POST FORM */}
      {posting && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSubmittingListing) {
              setposting(false);
            }
          }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
        >
          <section
            aria-labelledby="post-listing-title"
            aria-modal="true"
            className="flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            role="dialog"
          >
            <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Marketplace</p>
                <h2 id="post-listing-title" className="mt-1 flex items-center gap-2 font-outfit text-2xl font-bold text-slate-900">
                  Post a new item <Plus className="text-emerald-600" size={21} />
                </h2>
                <p className="mt-1 text-sm text-slate-500">Add clear details so students know exactly what you&apos;re offering.</p>
              </div>
              <button
                type="button"
                aria-label="Close post form"
                disabled={isSubmittingListing}
                onClick={() => setposting(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </header>

            <form onSubmit={handleSubmitListing} className="flex flex-col overflow-hidden">
              <div className="overflow-y-auto px-5 py-5 sm:px-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Item title
                    <input
                      type="text"
                      value={listingForm.title}
                      onChange={(event) =>
                        setListingForm((current) => ({ ...current, title: event.target.value }))
                      }
                      placeholder="e.g. MacBook Air M2"
                      required
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                    Category
                    <select
                      value={listingForm.category}
                      onChange={(event) =>
                        setListingForm((current) => ({ ...current, category: event.target.value }))
                      }
                      required
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 font-normal text-slate-700 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    >
                      <option value="" disabled>Select a category</option>
                      <optgroup label="Products">
                        <option value="Electronics">Electronics</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Home">Home</option>
                      </optgroup>
                      <optgroup label="Services">
                        <option value="Tutoring">Tutoring</option>
                        <option value="Barbering">Barbing</option>
                        <option value="Hair Styling">Hair Styling</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Photography">Photography</option>
                        <option value="Photo Editing">Photo Editing</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Tech Repair">Tech Repair</option>
                        <option value="Writing & Editing">Writing &amp; Editing</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Catering">Catering</option>
                        <option value="Delivery">Delivery</option>
                      </optgroup>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                    Price (NGN)
                    <span className="flex min-h-11 items-center rounded-xl border border-slate-200 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">
                      <span className="border-r border-slate-200 px-3.5 text-slate-500">₦</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={listingForm.price}
                        onChange={(event) =>
                          setListingForm((current) => ({ ...current, price: event.target.value }))
                        }
                        placeholder="0"
                        required
                        className="min-w-0 flex-1 rounded-r-xl bg-transparent px-3.5 font-normal outline-none placeholder:text-slate-400"
                      />
                    </span>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Image URL
                    <input
                      type="url"
                      value={listingForm.image}
                      onChange={(event) =>
                        setListingForm((current) => ({ ...current, image: event.target.value }))
                      }
                      placeholder="https://example.com/photo.jpg"
                      required
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                    <span className="text-xs font-normal text-slate-500">Use a direct link to a clear product photo.</span>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Description
                    <textarea
                      rows={4}
                      value={listingForm.description}
                      onChange={(event) =>
                        setListingForm((current) => ({ ...current, description: event.target.value }))
                      }
                      placeholder="Describe the item, its condition, and any useful details..."
                      required
                      className="resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 sm:col-span-2">
                    WhatsApp number
                    <input
                      type="tel"
                      value={listingForm.phone}
                      onChange={(event) =>
                        setListingForm((current) => ({ ...current, phone: event.target.value }))
                      }
                      placeholder="e.g. 08012345678"
                      required
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </label>
                </div>

                {listingError && (
                  <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {listingError}
                  </p>
                )}
              </div>

              <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  disabled={isSubmittingListing}
                  onClick={() => {
                    if (!isSubmittingListing) setposting(false);
                  }}
                  className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    !listingForm.category.trim() ||
                    !listingForm.description.trim() ||
                    !listingForm.image.trim() ||
                    !listingForm.title.trim() ||
                    !listingForm.price ||
                    !listingForm.phone.trim() ||
                    !Number.isFinite(Number(listingForm.price)) ||
                    Number(listingForm.price) <= 0 ||
                    listingForm.phone.replace(/\D/g, "").length < 7
                    }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Plus size={17} />
                  {isSubmittingListing ? "Publishing..." : "Publish listing"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
      {postSucess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPostSucess(false);
              router.refresh();
            }
          }}
        >
          <section
            aria-labelledby="profile-saved-title"
            aria-modal="true"
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            role="dialog"
          >
            <div className="h-1.5 bg-emerald-500" />
            <div className="flex flex-col items-center px-6 pb-6 pt-8 text-center sm:px-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
                <Check aria-hidden="true" className="text-emerald-700" size={30} strokeWidth={2.5} />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Profile settings
              </p>
              <h2
                className="mt-2 font-outfit text-2xl font-bold text-slate-900"
                id="profile-saved-title"
              >
                Changes saved
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your profile information has been updated successfully.
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => {
                  setPostSucess(false);
                  router.refresh();
                }}
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <Check size={17} />
                Done
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
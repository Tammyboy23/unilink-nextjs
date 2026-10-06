"use client";

import Navbar from "../components/Navbar";
import {
  Camera,
  School2,
  Plus,
  Edit3,
  Share,
  Calendar,
  LogOut,
  TriangleAlert,
  X,
  PenBoxIcon,
  Check,
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
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayname, setDisplayname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [posting, setposting] = useState(false);
  const [listingForm, setListingForm] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });
  const [listingError, setListingError] = useState("");
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);
  const [postSucess, setPostSucess] = useState(false);
  const [myListings, setMyListings] = useState<UserListing[]>([]);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) return;

        const data: Profile = await response.json();
        setProfile(data);
        setDisplayname(data.displayname ?? "");
        setProfilePic(data.profile_pic ?? "");

        const currentUserId = Number(data.id);
        const productsResponse = await fetch(`/api/product?userId=${currentUserId}`);
        if (productsResponse.ok) {
          const products = (await productsResponse.json()) as UserListing[];
          setMyListings(Array.isArray(products) ? products : []);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }

    loadProfile();
  }, []);

  function openEditProfile() {
    setDisplayname(profile?.displayname ?? "");
    setProfilePic(profile?.profile_pic ?? "");
    setEditProfile(true);
  }

  function saveProfileEdits() {
    if (profile) {
      setProfile({
        ...profile,
        displayname,
        profile_pic: profilePic,
      });
    }
    setEditProfile(false);
  }

  async function confirmLogout() {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

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
  function saveEdits() {
    fetch("/api/profile",{
        method: "PATCH",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({displayname, profile_pic: profilePic, id: profile?.id})
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error.message)
    })
    .finally(() => {
      setEditProfile(false)
      setPostSucess(true)
      router.refresh()

    })
  }

  function resetListingForm() {
    setListingForm({
      title: "",
      category: "",
      price: "",
      image: "",
      description: "",
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
    const numericPrice = Number(listingForm.price);

    if (!trimmedTitle || !trimmedDescription || !trimmedImage || !trimmedCategory || !listingForm.price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setListingError("Please fill in every field with a valid price.");
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
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Unable to publish your listing.");
      }

      const refreshedProducts = await fetch(`/api/product?userId=${profile?.id ?? ""}`);
      if (refreshedProducts.ok) {
        const products = (await refreshedProducts.json()) as UserListing[];
        setMyListings(Array.isArray(products) ? products : []);
      }

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
          <div className="relative h-36 bg-emerald-500 max-md:h-26">
            <span className="absolute right-3 top-3 flex items-center justify-center gap-2 rounded-xl border border-white px-4 py-1.5 font-outfit text-sm font-semibold text-white hover:bg-white/60">
              <Camera size={16} />
              Edit Cover
            </span>
          </div>

          {/* PROFILE & INFO */}
          <div className="-mt-20 flex flex-col gap-10 px-20 max-md:-mt-10 max-md:gap-6 max-md:px-5">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-3 border-white max-md:h-20 max-md:w-20">
              {profile?.profile_pic ? (
                <img
                  src={profile.profile_pic}
                  alt={`${profile.username}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-emerald-400 text-4xl font-bold text-white">
                  {profile?.username?.[0]?.toUpperCase() ?? "U"}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 max-md:gap-2">
              <h1 className="font-cabin text-4xl font-bold max-md:text-3xl">
                {profile?.displayname || profile?.username || "Your profile"}
              </h1>
              <p className=" font-inter font-black  text-gray-500">
                {profile?.username ? `@${profile.username}` : ""}
              </p>
              <span className="flex items-center gap-2 font-semibold text-gray-500">
                <School2 className="text-emerald-600" />
                {profile?.school}
              </span>
              <p className="flex gap-2">
                <Calendar />
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </p>
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

            {myListings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                You haven&apos;t posted any items yet. Use the Post button to add your first listing.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {myListings.map((product) => (
                  <Link
                    key={product.id}
                    href={`/marketplace/${product.id}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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

                    <div className="space-y-3 p-4">
                      <div>
                        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">{product.school}</p>
                      </div>

                      <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <span className="text-xl font-black text-emerald-600">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                          Active
                        </span>
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
            if (event.target === event.currentTarget) setEditProfile(false);
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

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdits}
                className="min-h-11 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Save changes
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
                      <option value="Electronics">Electronics</option>
                      <option value="Textbooks">Textbooks</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Home">Home</option>
                      <option value="Tutoring">Tutoring</option>
                      <option value="Tech Repair">Tech Repair</option>
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
                  disabled={isSubmittingListing}
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
        <div className="fixed inset-0 w-full h-full bg-slate-950/45 z-100 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-6 px-15 ">
                <div className="bg-emerald-100 p-4 rounded-full mt-4 border-2 border-emerald-700"><Check className="text-emerald-700 font-semibold" size={40}/></div>
                <h1 className="text-2xl font-outfit font-semibold text-center">Profile  Updated  <br />Successfully!</h1>
                <button onClick={() => {setPostSucess(false);
                     router.refresh()}} className="border border-slate-500 bg-slate-200 text-black font-outfit font-semibold rounded-full px-4 py-1.5 hover:bg-slate-50">Close</button>
            </div>
        </div>
      )}
    </>
  );
}
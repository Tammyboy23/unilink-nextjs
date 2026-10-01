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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayname, setDisplayname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) return;

        const data: Profile = await response.json();
        setProfile(data);
        setDisplayname(data.displayname ?? "");
        setProfilePic(data.profile_pic ?? "");
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
    .finally(
        setEditProfile(false)
    )
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
              <p className="font-rubik font-semibold text-gray-500">
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
            <p className="text-sm text-slate-500">
              Leaving UniLink on this device?
            </p>
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
    </>
  );
}
"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link  from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
    {
    title: "Your campus, your marketplace.",
    description:
      "Discover useful finds and student-run services from people in your campus community.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Explore Now",
    buttonLink: "/marketplace",
  },
  {
    title: "Find your next campus essential.",
    description:
      "Browse practical products and services posted by students at nearby schools.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Browse Products",
    buttonLink: "/marketplace",
  },
  {
    title: "Ready to pass it on?",
    description:
      "List what you no longer need and connect with students looking for it.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1800&q=85",
    buttonText: "Start Selling",
    buttonLink: "/marketplace",
  },
]

export default function HeroCarosel(){
    return(
        <Swiper 
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full max-md:h-min-5 overflow-hidden rounded-2xl">
            {banners.map((banner) => (
                <SwiperSlide key={banner.title}>
                    <section
                     className="relative flex min-h-[300px] items-center
                    overflow-hidden rounded-2xl bg-slate-900 bg-cover
                     bg-center px-6 py-10 text-white md:min-h-[340px]
                     md:px-12"
                    style={{
                    backgroundImage: `url("${banner.image}")`,
                    }}
                >
            {/* Dark overlay makes text easier to read */}
            <div className="absolute inset-0 bg-gradient-to-r
              from-black/90 via-black/60 to-transparent" />

            {/* Text and button */}
            <div className="relative z-10 max-w-xl">

              <h2 className="text-3xl font-bold tracking-tight
                md:text-5xl">
                {banner.title}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6
                text-white/80 md:text-base">
                {banner.description}
              </p>

              <Link
                href={banner.buttonLink}
                className="mt-6 inline-flex items-center gap-2
                  rounded-xl bg-emerald-700 px-6 py-3
                  font-semibold text-white transition
                  hover:bg-emerald-500 font-inter font-black"
              >
                {banner.buttonText}
              </Link>
            </div>
          </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
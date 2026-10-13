"use client";

import { Autoplay , Pagination, Navigation} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link  from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
    {
    title: "Buy. Sell. Connect.",
    description:
      "Your campus marketplace, all in one place. Find what you need, near you.",
    image: "https://i.pinimg.com/736x/53/e3/22/53e3228b505ddf423dde5444b5028548.jpg",
    buttonText: "Explore Now",
    buttonLink: "/products",
  },
  {
    title: "Discover Campus Deals",
    description:
      "Find amazing products and services listed by fellow students.",
    image: "https://i.pinimg.com/736x/b2/b9/7f/b2b97fab420adedeb0f6c43592a6105a.jpg",
    buttonText: "Browse Products",
    buttonLink: "/products",
  },
  {
    title: "Got Something to Sell?",
    description:
      "List your products and make them discoverable to other students.",
    image: "https://i.pinimg.com/1200x/90/67/eb/9067ebc61b7b972efc65225fd6094892.jpg",
    buttonText: "Start Selling",
    buttonLink: "/sell",
  },
]

export default function HeroCarosel(){
    return(
        <Swiper 
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="w-full overflow-hidden rounded-2xl">
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
              <span className="mb-4 inline-block rounded-full
                bg-blue-500/30 px-4 py-2 text-sm font-medium">
                Unilink
              </span>

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
                  rounded-full bg-sky-400 px-6 py-3
                  font-semibold text-slate-950 transition
                  hover:bg-sky-300"
              >
                {banner.buttonText}
                <span aria-hidden="true"><MoveRight /></span>
              </Link>
            </div>
          </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
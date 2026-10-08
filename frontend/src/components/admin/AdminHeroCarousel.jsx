import { useEffect, useState } from "react";

const slides = [
    {
        title: "Admin Problem Management",
        desc: "Add, update and delete coding problems securely",
        image: "https://imgs.search.brave.com/gbYbfFNZqePkOz6v53jImLrQZqYwA3a8JqdnpqEXUWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzE0LzEzLzQy/LzM2MF9GXzkxNDEz/NDI2NV9lb0xBbEVl/VTZNTjBEYWIzenJM/VHlOS3JNMUNVUVVa/US5qcGc",
    },
    {
        title: "User & Problem Control Management ",
        desc: "Monitor users, submissions and problem activity",
        image: "https://imgs.search.brave.com/HiFLmH2YBSR99xtUPM2ztmEHLXiBKpbDLkHETs2tTbc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzk5LzM3LzU0/LzM2MF9GXzE5OTM3/NTQyNV9JNGFHQWY3/S0x0OVR0d0ZKemt0/d1p5bzVUUGFtZ0pE/by5qcGc",
    },
    {
        title: "Platform Security & Analytics",
        desc: "Ensure secure access and real-time insights",
        image: "https://imgs.search.brave.com/i_duM7L89iZ2iYlRLAkZ1f6a5gzVi5hBaLkIfZpzhiE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzIxLzc1LzU4/LzM2MF9GXzYyMTc1/NTgzNl9kWnpjWUF5/M2VidXBablRqaWlq/SWZjalU1b0ltUkhy/TC5qcGc",
    },
];

const AdminHeroCarousel = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((p) => (p + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[420px] mt-2 mx-auto w-[100%] overflow-hidden rounded-3xl shadow-2xl">

            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === active ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Image */}
                    <img
                        src={slide.image}
                        alt="admin banner"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center px-10 md:px-20">
                        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-2xl text-white max-w-xl border border-white/20">
                            <h1 className="text-3xl md:text-4xl font-extrabold">
                                {slide.title}
                            </h1>
                            <p className="mt-4 text-lg text-white/90">
                                {slide.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

        

            {/* Dots */}
            <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setActive(i)}
                        className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all ${i === active
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminHeroCarousel;

import { useEffect, useRef } from "react";

export function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleReserve = () => {
    const el = document.querySelector("#reservation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDiscover = () => {
    const el = document.querySelector("#chambres");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0C0B09]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1765782590990-a590be1dbd40?w=1920&h=1080&fit=crop&auto=format)`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0B09]/60 via-[#0C0B09]/40 to-[#0C0B09]/80" />
      {/* Horizontal dark strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0B09] to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Location tag */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#B8935A]" />
          <span
            className="text-[#B8935A] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Roubaix, France
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-white mb-6 max-w-3xl"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
          }}
        >
          Vivre la ville,<br />
          <em style={{ fontStyle: "italic", color: "#B8935A" }}>autrement.</em>
        </h1>

        {/* Tagline */}
        <p
          className="text-white/60 mb-10 max-w-md"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
            lineHeight: 1.7,
          }}
        >
          Hôtel business & urban. Espaces modernes, coworking intégré,<br className="hidden md:block" />
          connexion parfaite — tout ce qu'il faut pour travailler et s'évader.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleReserve}
            className="px-8 py-4 bg-[#B8935A] text-white hover:bg-[#A0803F] transition-all duration-300 text-sm tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Réserver une chambre
          </button>
          <button
            onClick={handleDiscover}
            className="px-8 py-4 border border-white/30 text-white hover:border-[#B8935A] hover:text-[#B8935A] transition-all duration-300 text-sm tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Découvrir
          </button>
        </div>

        {/* Stats strip */}
        <div className="hidden md:flex items-center gap-12 mt-14 pt-8 border-t border-white/10">
          {[
            { value: "82", label: "Chambres" },
            { value: "24/7", label: "Coworking" },
            { value: "5 min", label: "du centre" },
            { value: "★ 4.7", label: "sur Booking" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="text-white"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 300 }}
              >
                {s.value}
              </span>
              <span
                className="text-white/40 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.15em" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2">
        <div
          className="w-px h-12 bg-white/20 relative overflow-hidden"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        >
          <div
            className="absolute top-0 left-0 w-full bg-[#B8935A]"
            style={{ height: "40%", animation: "scrollDrop 2s ease-in-out infinite" }}
          />
        </div>
        <span
          className="text-white/30 text-xs tracking-widest uppercase"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            writingMode: "vertical-rl",
            letterSpacing: "0.2em",
          }}
        >
          Scroll
        </span>
        <style>{`
          @keyframes scrollDrop {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(300%); }
          }
        `}</style>
      </div>
    </section>
  );
}

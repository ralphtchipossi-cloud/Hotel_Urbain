import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1647960563439-0160d88ca2b7?w=1400&h=900&fit=crop&auto=format",
    label: "Entrée & Hall",
    category: "Espaces communs",
  },
  {
    url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Standard",
    category: "Chambres",
  },
  {
    url: "https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Confort",
    category: "Chambres",
  },
  {
    url: "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Suite",
    category: "Chambres",
  },
  {
    url: "https://images.unsplash.com/photo-1774186184471-32c1339d2d8c?w=1400&h=900&fit=crop&auto=format",
    label: "Espace Coworking",
    category: "Coworking",
  },
  {
    url: "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=1400&h=900&fit=crop&auto=format",
    label: "Restaurant & Bar",
    category: "Restauration",
  },
  {
    url: "https://images.unsplash.com/photo-1720694924759-2a2daaa98987?w=1400&h=900&fit=crop&auto=format",
    label: "Bar lounge",
    category: "Restauration",
  },
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop&auto=format",
    label: "Salle de sport",
    category: "Bien-être",
  },
];

const categories = ["Tous", ...Array.from(new Set(photos.map((p) => p.category)))];

export function Gallery() {
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const filtered = filter === "Tous" ? photos : photos.filter((p) => p.category === filter);
  
  const currentAutoplayImage = filtered[autoplayIndex];

  // Auto-slide toutes les 2 secondes
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAutoplayIndex((prev) => (prev + 1) % filtered.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, filtered.length]);

  // Reset autoplay index quand on change de filtre
  useEffect(() => {
    setAutoplayIndex(0);
    setIsPlaying(true);
  }, [filter]);

  const prevImage = () => {
    setIsPlaying(false);
    setAutoplayIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const nextImage = () => {
    setIsPlaying(false);
    setAutoplayIndex((prev) => (prev + 1) % filtered.length);
  };

  const prev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);

  const next = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  return (
    <section id="galerie" className="bg-[#F4F2EE] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Galerie
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#131210",
                lineHeight: 1.1,
              }}
            >
              L'hôtel en<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>images.</em>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 ${
                  filter === cat
                    ? "bg-[#131210] text-white"
                    : "border border-[#E8E4DC] text-[#7A7568] hover:border-[#131210] hover:text-[#131210]"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carrousel automatique */}
        <div className="relative overflow-hidden bg-[#E8E4DC] rounded-none aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${autoplayIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setLightbox(autoplayIndex)}
            >
              <img
                src={currentAutoplayImage?.url}
                alt={currentAutoplayImage?.label}
                className="w-full h-full object-cover"
              />
              {/* Overlay avec label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-sm md:text-base font-['Plus Jakarta Sans'] tracking-wider">
                  {currentAutoplayImage?.label}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {currentAutoplayImage?.category}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contrôles du carrousel */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {/* Bouton Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center text-[#7A7568] hover:border-[#B8935A] hover:text-[#B8935A] transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Indicateurs de slide */}
            <div className="flex gap-2 ml-4 items-center">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsPlaying(false);
                    setAutoplayIndex(i);
                  }}
                  className={`transition-all duration-300 ${
                    i === autoplayIndex
                      ? "w-8 h-1.5 bg-[#B8935A]"
                      : "w-1.5 h-1.5 bg-[#C8C3B8] hover:bg-[#B8935A]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevImage}
              className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center text-[#7A7568] hover:border-[#131210] hover:text-[#131210] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center text-[#7A7568] hover:border-[#131210] hover:text-[#131210] transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Compteur */}
        <div className="text-center mt-4">
          <span className="text-[#7A7568] text-xs">
            {autoplayIndex + 1} / {filtered.length}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0C0B09]/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#B8935A] hover:text-[#B8935A] transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-[#B8935A] hover:text-[#B8935A] transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl w-full px-20 md:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].url}
                alt={filtered[lightbox].label}
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-white" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 300 }}>
                    {filtered[lightbox].label}
                  </p>
                  <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {filtered[lightbox].category}
                  </p>
                </div>
                <span className="text-white/30 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {lightbox + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-[#B8935A] hover:text-[#B8935A] transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`transition-all duration-200 ${i === lightbox ? "w-6 h-1.5 bg-[#B8935A]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
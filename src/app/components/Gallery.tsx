import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const photos = [
  {
    // Image Standard
    url: "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Standard - Le bureau où tu dors",
  },
  {
    // Image Confort
    url: "https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Confort - Ta bulle dans la ville",
  },
  {
    // Image Suite
    url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1400&h=900&fit=crop&auto=format",
    label: "Urban Suite - Le penthouse du business travel",
  },
  {
    url: "https://cdn.leonardo.ai/users/6018d7d9-32a3-4db2-9ddd-1b335202857f/generations/1f1656d9-3d9e-6f50-ac99-417b232e36c7/lucid-origin_genere_une_design_ou_image_d_entre_hall_lobby_d_hotel_qui_est_de_nuit_mais_luxe-0.jpg",
    label: "Entrée & Hall - Lobby design",
  },
  {
    url: "https://images.unsplash.com/photo-1774186184471-32c1339d2d8c?w=1400&h=900&fit=crop&auto=format",
    label: "Espace Coworking - Productivité assurée",
  },
  {
    url: "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=1400&h=900&fit=crop&auto=format",
    label: "Restaurant & Bar - Cuisine locale",
  },
  {
    url: "https://images.unsplash.com/photo-1720694924759-2a2daaa98987?w=1400&h=900&fit=crop&auto=format",
    label: "Bar lounge - Détente en soirée",
  },
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop&auto=format",
    label: "Salle de sport - Fitness 24h/24",
  },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide toutes les 2 secondes
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const prevImage = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextImage = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevLightbox = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + photos.length) % photos.length);
  }, [lightbox]);

  const nextLightbox = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % photos.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prevLightbox, nextLightbox]);

  const currentImage = photos[currentIndex];

  return (
    <section id="galerie" className="bg-[#F4F2EE] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#B8935A]" />
            <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Galerie
            </span>
            <div className="w-8 h-px bg-[#B8935A]" />
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

        {/* Carrousel automatique */}
        <div className="relative overflow-hidden bg-[#E8E4DC] aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setLightbox(currentIndex)}
            >
              <img
                src={currentImage?.url}
                alt={currentImage?.label}
                className="w-full h-full object-cover"
              />
              {/* Overlay avec label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-sm md:text-base font-['Plus Jakarta Sans'] tracking-wider">
                  {currentImage?.label}
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
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(i);
                  }}
                  className={`transition-all duration-300 ${
                    i === currentIndex
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
            {currentIndex + 1} / {photos.length}
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
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
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
                src={photos[lightbox].url}
                alt={photos[lightbox].label}
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-white" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 300 }}>
                    {photos[lightbox].label}
                  </p>
                </div>
                <span className="text-white/30 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {lightbox + 1} / {photos.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-[#B8935A] hover:text-[#B8935A] transition-colors"
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
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
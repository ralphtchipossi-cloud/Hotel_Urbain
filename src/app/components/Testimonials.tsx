import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Sophie M.",
    role: "Directrice commerciale",
    company: "Lyon",
    rating: 5,
    text: "Un hôtel qui a tout compris pour les voyages business. Le coworking est impeccable, la connexion irréprochable, et le staff toujours disponible. Je reviens chaque mois à Roubaix et je ne logerai nulle part ailleurs.",
    stay: "Urban Confort — 3 nuits",
    platform: "Booking.com",
  },
  {
    name: "Thomas R.",
    role: "Consultant freelance",
    company: "Paris",
    rating: 5,
    text: "L'espace coworking est une vraie pépite. Des bureaux ergonomiques, la lumière parfaite, et le café offert. J'ai réussi à finir un gros projet en deux jours dans les meilleures conditions. L'hôtel a un vrai design sans être prétentieux.",
    stay: "Urban Standard — 2 nuits",
    platform: "Google",
  },
  {
    name: "Aurélie & Marc",
    role: "City-break week-end",
    company: "Bruxelles",
    rating: 5,
    text: "On cherchait un hôtel moderne et abordable pour explorer Roubaix et Lille. Urban House était parfait : chambre confortable, petit-déjeuner excellent, et personnel aux petits soins. Le rapport qualité-prix est imbattable.",
    stay: "Urban Suite — 2 nuits",
    platform: "TripAdvisor",
  },
  {
    name: "Kevin L.",
    role: "Chef de projet IT",
    company: "Nantes",
    rating: 5,
    text: "Chambre moderne, propre, bien insonorisée. Le bar est sympa pour décompresser en soirée. Le parking sécurisé avec borne électrique est un vrai plus. Je recommande sans hésiter à tous mes collègues de passage dans le Nord.",
    stay: "Urban Standard — 1 nuit",
    platform: "Google",
  },
  {
    name: "Isabelle P.",
    role: "DRH",
    company: "Lille",
    rating: 5,
    text: "Nous avons organisé un séminaire de 12 personnes dans les salles de réunion. Tout était parfait : équipements modernes, pause-café soignée, et coordination hôtelière sans faille. Nous reviendrons pour le prochain séminaire.",
    stay: "Séminaire — salle premium",
    platform: "Booking.com",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setAutoplay(false);
    setCurrent((c) => (c + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay]);

  const review = reviews[current];

  return (
    <section id="avis" className="bg-[#EEEBE4] py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Avis clients
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
              Ce que disent<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>nos clients.</em>
            </h2>
          </div>

          {/* Global scores */}
          <div className="flex gap-8">
            {[
              { platform: "Booking", score: "9.1" },
              { platform: "Google", score: "4.8★" },
              { platform: "TripAdvisor", score: "#1" },
            ].map((s) => (
              <div key={s.platform} className="flex flex-col items-center gap-1">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 300, color: "#131210" }}>
                  {s.score}
                </span>
                <span className="text-[#7A7568] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.platform}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-10 md:p-14"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#B8935A]" style={{ fontSize: "1rem" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-[#131210] mb-8 max-w-3xl"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                « {review.text} »
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#B8935A] flex items-center justify-center">
                    <span className="text-white text-sm" style={{ fontFamily: "'Fraunces', serif" }}>
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#131210] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                      {review.name}
                    </p>
                    <p className="text-[#7A7568] text-xs mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {review.role} — {review.company}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[#7A7568] text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {review.stay}
                  </span>
                  <span className="text-[#B8935A] text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    via {review.platform}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i); }}
                  className={`transition-all duration-300 ${i === current ? "w-8 h-1.5 bg-[#B8935A]" : "w-1.5 h-1.5 bg-[#C8C3B8] hover:bg-[#B8935A]"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center text-[#7A7568] hover:border-[#131210] hover:text-[#131210] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center text-[#7A7568] hover:border-[#131210] hover:text-[#131210] transition-colors"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#7A7568] text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Rejoignez plus de 2 400 clients satisfaits
          </p>
          <button
            onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-[#131210] text-white hover:bg-[#B8935A] transition-all duration-300 text-sm tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </section>
  );
}

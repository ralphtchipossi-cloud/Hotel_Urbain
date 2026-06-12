import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Rooms } from "./components/Rooms";
import { Coworking } from "./components/Coworking";
import { BusinessServices } from "./components/BusinessServices";
import { Gallery } from "./components/Gallery";
import { Offers } from "./components/Offers";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Reservation } from "./components/Reservation";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#131210] border border-[#B8935A] flex items-center justify-center text-[#B8935A] hover:bg-[#B8935A] hover:text-white transition-all duration-300 shadow-lg"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Page d'accueil avec toutes les sections
function HomePage() {
  return (
    <>
      <Hero />

      {/* About strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#131210] py-10 px-6 lg:px-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="text-white/70 text-sm max-w-xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.85 }}
          >
            Urban House est un hôtel business de nouvelle génération, implanté au cœur de Roubaix. Conçu pour les professionnels, les city-breakers et les jeunes actifs qui exigent efficacité, design et connexion — sans compromis.
          </p>
          <div className="flex gap-10 shrink-0">
            {[
              { label: "Booking.com", value: "9.1 / 10" },
              { label: "TripAdvisor", value: "#1 Roubaix" },
              { label: "Google", value: "4.8 ★" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 items-end">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.3rem", fontWeight: 300, color: "#B8935A" }}>
                  {s.value}
                </span>
                <span className="text-white/30 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Rooms />
      <Gallery />
      <Coworking />
      <BusinessServices />
      <Offers />
      <Testimonials />
      <FAQ />
      <Reservation />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
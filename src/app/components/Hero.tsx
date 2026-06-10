// src/app/components/Hero.tsx
import { motion } from "motion/react";

export function Hero() {
  const handleReserve = () => {
    const el = document.querySelector("#reservation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDiscover = () => {
    const el = document.querySelector("#chambres");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070)",
          backgroundPosition: "center 30%"
        }}
      />
      
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          URBAN HOUSE
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 mb-8"
        >
          Hôtel business & moderne — Roubaix
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4"
        >
          <button 
            onClick={handleReserve}
            className="bg-[#1E2A3E] hover:bg-[#2A3A52] text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Réserver
          </button>
          <button 
            onClick={handleDiscover}
            className="border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Découvrir
          </button>
        </motion.div>
      </div>
      
      {/* Indicateur scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
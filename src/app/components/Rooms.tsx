// src/app/components/Rooms.tsx
import { useState } from "react";
import { motion } from "motion/react";

const rooms = [
  {
    id: "standard",
    name: "Urban Standard",
    tagline: "Le bureau où tu dors",
    price: "89",
    size: "18 m²",
    img: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&h=600&fit=crop&auto=format",
    features: ["Lit double 160×200", "Bureau ergonomique", "Wi-Fi fibre 1 Gbps", "TV 4K 43\"", "Climatisation", "Coffre-fort"],
    benefit: "Pour les pros pressés mais exigeants",
    highlight: false,
  },
  {
    id: "confort",
    name: "Urban Confort",
    tagline: "Ta bulle dans la ville",
    price: "129",
    size: "26 m²",
    img: "https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?w=800&h=600&fit=crop&auto=format",
    features: ["Lit king size 180×200", "Coin salon", "Bureau premium", "Wi-Fi fibre 1 Gbps", "Mini-bar", "Vue ville"],
    benefit: "Calme, espace, lumière",
    highlight: true,
  },
  {
    id: "suite",
    name: "Urban Suite",
    tagline: "Le penthouse du business travel",
    price: "189",
    size: "42 m²",
    img: "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800&h=600&fit=crop&auto=format",
    features: ["Chambre séparée", "Salon de travail", "Baignoire balnéo", "Accueil VIP", "Petit-déjeuner inclus", "Late check-out"],
    benefit: "Impressionner ou se faire plaisir",
    highlight: false,
  },
];

export function Rooms() {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleReserve = () => {
    document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="chambres" className="bg-[#F4F2EE] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span
                className="text-[#B8935A] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Hébergement
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
              Nos chambres,<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>vos espaces.</em>
            </h2>
          </div>
          <p
            className="max-w-sm text-[#7A7568]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}
          >
            Conçues pour les professionnels et les voyageurs exigeants. Chaque chambre associe confort, connectivité et design urbain.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E4DC]">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#F4F2EE] flex flex-col overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHovered(room.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-[#E8E4DC]">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {room.highlight && (
                  <div className="absolute top-4 left-4 bg-[#B8935A] px-3 py-1">
                    <span
                      className="text-white text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Populaire
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-[#131210]/80 backdrop-blur-sm px-3 py-2">
                  <span
                    className="text-white/50 text-xs"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {room.size}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 border-b border-[#E8E4DC]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "1.4rem",
                        fontWeight: 400,
                        color: "#131210",
                      }}
                    >
                      {room.name}
                    </h3>
                    <p
                      className="text-[#7A7568] mt-1"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.05em" }}
                    >
                      {room.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "1.8rem",
                        fontWeight: 300,
                        color: "#131210",
                      }}
                    >
                      {room.price}€
                    </span>
                    <p
                      className="text-[#7A7568] text-xs"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      / nuit
                    </p>
                    {/* Bénéfice émotionnel */}
                    <p
                      className="text-[#B8935A] text-[10px] mt-1 italic"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {room.benefit}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-4 flex-1 grid grid-cols-2 gap-y-2 gap-x-4">
                  {room.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[#7A7568]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem" }}
                    >
                      <div className="w-1 h-1 rounded-full bg-[#B8935A] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleReserve}
                  className="mt-6 w-full py-3 border border-[#131210] text-[#131210] hover:bg-[#131210] hover:text-white transition-all duration-300 text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.15em" }}
                >
                  Réserver
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
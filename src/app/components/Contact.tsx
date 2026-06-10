import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  return (
    <section id="contact" className="bg-[#131210] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Contact & Accès
          </span>
        </div>
        <h2
          className="text-white mb-16"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          Nous trouver,<br />
          <em style={{ fontStyle: "italic", color: "#B8935A" }}>nous joindre.</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div className="flex flex-col gap-8">
            {[
              {
                icon: MapPin,
                title: "Adresse",
                lines: ["12 Rue de la République", "59100 Roubaix, France"],
              },
              {
                icon: Phone,
                title: "Téléphone",
                lines: ["+33 3 20 00 00 00"],
              },
              {
                icon: Mail,
                title: "E-mail",
                lines: ["contact@urbanhouse-roubaix.fr", "reservation@urbanhouse-roubaix.fr"],
              },
              {
                icon: Clock,
                title: "Réception",
                lines: ["Ouverte 24h/24, 7j/7"],
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-5">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <Icon className="w-4 h-4 text-[#B8935A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {item.title}
                    </p>
                    {item.lines.map((l) => (
                      <p key={l} className="text-white/80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}>
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Transports */}
            <div className="mt-4 pt-8 border-t border-white/10">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Accès
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { mode: "Métro", detail: "Ligne 2 — Station Eurotéléport (5 min à pied)" },
                  { mode: "Train", detail: "Gare de Roubaix (10 min à pied)" },
                  { mode: "Voiture", detail: "A22 sortie Roubaix-Centre. Parking hôtel disponible." },
                  { mode: "Aéroport", detail: "Lille-Lesquin : 25 min en taxi ou navette hôtel." },
                ].map((t) => (
                  <div key={t.mode} className="flex gap-3">
                    <span className="text-[#B8935A] text-xs w-16 shrink-0 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}>
                      {t.mode}
                    </span>
                    <span className="text-white/50 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
                      {t.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: map placeholder */}
          <div className="relative bg-[#1A1917] overflow-hidden min-h-[400px] flex items-center justify-center">
            {/* Stylised map grid overlay */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute left-0 right-0 h-px bg-white" style={{ top: `${i * 10}%` }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${i * 10}%` }} />
              ))}
            </div>
            {/* Pin */}
            <div className="relative flex flex-col items-center gap-3 z-10">
              <div className="w-14 h-14 bg-[#B8935A] flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="bg-[#131210]/90 backdrop-blur-sm px-5 py-3 text-center">
                <p className="text-white text-sm" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400 }}>Urban House</p>
                <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12 Rue de la République, Roubaix</p>
              </div>
              <a
                href="https://maps.google.com/?q=Roubaix+France"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-6 py-2 border border-[#B8935A] text-[#B8935A] hover:bg-[#B8935A] hover:text-white transition-all text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ouvrir Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

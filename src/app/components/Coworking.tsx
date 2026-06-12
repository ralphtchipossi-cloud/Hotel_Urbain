import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const perks = [
  { num: "01", title: "Accès 24h/24", desc: "Espace ouvert en continu. Travaillez à l'heure qui vous convient, sans contrainte." },
  { num: "02", title: "Fibre 1 Gbps", desc: "Connexion symétrique dédiée. VPN, visioconférence et cloud sans latence." },
  { num: "03", title: "Salles de réunion", desc: "3 salles modulables de 4 à 14 personnes, équipées de matériel de présentation." },
  { num: "04", title: "Impression & scan", desc: "Station professionnelle disponible. Impression A3/A4 couleur et numérisation." },
  { num: "05", title: "Café & snacking", desc: "Bar à café en service libre, snacks et boissons fraîches inclus dans l'abonnement." },
  { num: "06", title: "Réception colis", desc: "Réception et stockage sécurisé de vos livraisons professionnelles." },
];

export function Coworking() {
  const navigate = useNavigate();

  return (
    <section id="coworking" className="bg-[#131210] py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top layout: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text side */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span
                className="text-[#B8935A] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Espace de travail
              </span>
            </div>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Le bureau que<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>vous méritez.</em>
            </h2>
            <p
              className="text-white/50 mb-8 leading-relaxed max-w-md"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.85 }}
            >
              Urban House intègre un espace coworking professionnel directement dans l'hôtel. Que vous séjourniez ou non, profitez d'un environnement conçu pour la productivité et la concentration.
            </p>

            {/* Pricing blocks */}
            <div className="flex gap-4 flex-wrap">
              {[
                { label: "Journée", price: "18€", note: "résidents: offert" },
                { label: "Semaine", price: "79€", note: "accès illimité" },
                { label: "Salle réunion", price: "25€/h", note: "dès 2h" },
              ].map((p) => (
                <div key={p.label} className="border border-white/10 px-5 py-4 flex flex-col gap-1 hover:border-[#B8935A] transition-colors">
                  <span
                    className="text-white/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="text-white"
                    style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 300 }}
                  >
                    {p.price}
                  </span>
                  <span
                    className="text-[#B8935A] text-xs"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {p.note}
                  </span>
                </div>
              ))}
            </div>

            {/* NOUVEAU - Bouton Réserver un bureau */}
            <div className="mt-8">
              <button
                onClick={() => navigate('/coworking-booking')}
                className="bg-[#B8935A] text-white px-8 py-3 hover:bg-[#A0803F] transition-colors text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.15em" }}
              >
                Réserver un bureau
              </button>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-[#1E1D1A]">
              <img
                src="https://images.unsplash.com/photo-1774186184471-32c1339d2d8c?w=1200&h=800&fit=crop&auto=format"
                alt="Espace coworking Urban House — bureaux modernes avec vue sur la ville"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-4 -left-4 bg-[#B8935A] px-6 py-4">
              <span
                className="text-white text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                120 m² dédiés
              </span>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {perks.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-[#131210] p-8 group hover:bg-[#1A1917] transition-colors"
            >
              <span
                className="text-white/15 text-xs tracking-widest mb-4 block"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {p.num}
              </span>
              <h4
                className="text-white mb-3 group-hover:text-[#B8935A] transition-colors"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", fontWeight: 400 }}
              >
                {p.title}
              </h4>
              <p
                className="text-white/40"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", lineHeight: 1.75 }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
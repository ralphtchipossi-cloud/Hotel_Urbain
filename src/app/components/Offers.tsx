import { motion } from "motion/react";
import { Tag, Briefcase, Moon, Zap } from "lucide-react";

const offers = [
  {
    icon: Briefcase,
    badge: "Business",
    title: "Pack Séjour Pro",
    desc: "Chambre + accès coworking illimité + petit-déjeuner + parking. Tout inclus pour travailler sereinement.",
    price: "149€",
    priceNote: "/ nuit (au lieu de 178€)",
    saving: "-16%",
    cta: "Réserver ce pack",
    color: "#B8935A",
    featured: true,
  },
  {
    icon: Moon,
    badge: "Week-end",
    title: "Escapade City-Break",
    desc: "2 nuits en Urban Confort + late check-out dimanche + accès spa & fitness inclus.",
    price: "199€",
    priceNote: "/ 2 nuits",
    saving: "-20%",
    cta: "Profiter de l'offre",
    color: "#131210",
    featured: false,
    urgentMessage: null,
  },
  {
    icon: Zap,
    badge: "Dernière minute",
    title: "Tonight Deal",
    desc: "Chambre disponible ce soir à tarif réduit. Offre valable jusqu'à 18h. Idéal pour les imprévus.",
    price: "69€",
    priceNote: "/ nuit",
    saving: "-25%",
    cta: "Saisir l'offre",
    color: "#131210",
    featured: false,
  },
  {
    icon: Tag,
    badge: "Fidélité",
    title: "Tarif Membre",
    desc: "Inscrivez-vous au programme Urban Club et bénéficiez de -10% sur tous vos séjours + accès prioritaire.",
    price: "Gratuit",
    priceNote: "à l'inscription",
    saving: "−10% à vie",
    cta: "Rejoindre Urban Club",
    color: "#131210",
    featured: false,
    urgentMessage: null,
  },
];

export function Offers() {
  const handleReserve = () => {
    document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="offres" className="bg-[#F4F2EE] py-24 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Offres spéciales
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
              Les meilleures offres,<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>en direct.</em>
            </h2>
          </div>
          <p
            className="max-w-sm text-[#7A7568]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.85 }}
          >
            Réservez en direct sur notre site et profitez de tarifs exclusifs, non disponibles sur les plateformes tierces.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E4DC]">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col p-8 group ${offer.featured ? "bg-[#131210]" : "bg-[#F4F2EE] hover:bg-white"} transition-colors duration-300`}
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-10 h-10 border flex items-center justify-center ${offer.featured ? "border-[#B8935A]" : "border-[#E8E4DC] group-hover:border-[#B8935A]"} transition-colors`}>
                    <Icon className="w-4 h-4 text-[#B8935A]" strokeWidth={1.5} />
                  </div>
                  <div className={`px-2 py-1 text-xs tracking-widest uppercase ${offer.featured ? "bg-[#B8935A] text-white" : "bg-[#E8E4DC] text-[#7A7568]"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {offer.badge}
                  </div>
                </div>

                {/* Content */}
                <h3
                  className={`mb-3 ${offer.featured ? "text-white" : "text-[#131210]"}`}
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 400 }}
                >
                  {offer.title}
                </h3>
                <p
                  className={`flex-1 text-sm leading-relaxed mb-6 ${offer.featured ? "text-white/50" : "text-[#7A7568]"}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.75 }}
                >
                  {offer.desc}
                </p>

                {/* Price */}
                <div className="flex items-end gap-2 mb-1">
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 300, color: "#B8935A" }}>
                    {offer.price}
                  </span>
                  <span className={`text-xs mb-1.5 ${offer.featured ? "text-white/30" : "text-[#7A7568]"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {offer.priceNote}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="bg-[#B8935A]/15 text-[#B8935A] text-xs px-2 py-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}>
                    Économie : {offer.saving}
                  </span>
                </div>

                {/* Message d'urgence */}
                {offer.urgentMessage && (
                  <div className={`mb-4 text-xs font-bold ${offer.urgentMessage.includes("⏰") ? "text-red-500" : "text-green-600"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {offer.urgentMessage}
                  </div>
                )}

                <button
                  onClick={handleReserve}
                  className={`w-full py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    offer.featured
                      ? "bg-[#B8935A] text-white hover:bg-[#A0803F]"
                      : "border border-[#131210] text-[#131210] hover:bg-[#131210] hover:text-white"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {offer.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[#7A7568] text-xs mt-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Offres valables sur réservation directe uniquement. Prix TTC, hors taxes de séjour. Sous réserve de disponibilité.
        </p>
      </div>
    </section>
  );
}
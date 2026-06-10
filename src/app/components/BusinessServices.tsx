import { Wifi, Car, Coffee, UtensilsCrossed, BriefcaseBusiness, Clock, ShieldCheck, Dumbbell } from "lucide-react";
import { motion } from "motion/react";

const services = [
  { icon: Wifi, title: "Wi-Fi Fibre 1 Gbps", desc: "Connexion dédiée dans toutes les zones de l'hôtel, y compris les espaces extérieurs." },
  { icon: Car, title: "Parking sécurisé", desc: "Parking couvert avec bornes de recharge électrique. Réservation à l'avance conseillée." },
  { icon: Coffee, title: "Petit-déjeuner business", desc: "Buffet continental servi dès 6h30. Café, viennoiseries, œufs, charcuteries de qualité." },
  { icon: UtensilsCrossed, title: "Restaurant & bar", desc: "Cuisine moderne et locale. Bar ouvert jusqu'à minuit avec cocktails et carte snacking." },
  { icon: BriefcaseBusiness, title: "Conciergerie pro", desc: "Réservation de taxis, navettes aéroport, coursiers, traductions et assistances diverses." },
  { icon: Clock, title: "Check-in/out flexible", desc: "Early check-in dès 8h et late check-out jusqu'à 16h selon disponibilité, sans surcoût." },
  { icon: ShieldCheck, title: "Sécurité 24h/24", desc: "Équipe de sécurité présente en permanence. Accès par badge magnétique sécurisé." },
  { icon: Dumbbell, title: "Fitness & bien-être", desc: "Salle de sport équipée ouverte 24h/24. Espace détente avec sauna sur réservation." },
];

export function BusinessServices() {
  return (
    <section id="services" className="bg-[#F4F2EE] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span
                className="text-[#B8935A] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Services
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
              Tout ce qu'il faut,<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>sans y penser.</em>
            </h2>
          </div>
          <p
            className="text-[#7A7568] lg:max-w-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.8 }}
          >
            Urban House est conçu pour les professionnels qui ne veulent pas perdre de temps. Chaque service est pensé pour simplifier votre séjour, de l'arrivée au départ.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E4DC]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-[#F4F2EE] p-8 flex flex-col gap-4 group hover:bg-white transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-[#E8E4DC] flex items-center justify-center group-hover:border-[#B8935A] transition-colors">
                  <Icon className="w-4 h-4 text-[#B8935A]" strokeWidth={1.5} />
                </div>
                <h4
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 400, color: "#131210" }}
                >
                  {s.title}
                </h4>
                <p
                  className="text-[#7A7568]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", lineHeight: 1.75 }}
                >
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight banner */}
        <div className="mt-px bg-[#131210] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-[#B8935A] text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Offre Business
            </p>
            <h3
              className="text-white"
              style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 300 }}
            >
              Tarifs préférentiels pour les entreprises
            </h3>
            <p
              className="text-white/40 mt-2 max-w-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              Contrats entreprise, facturation centralisée, tarifs négociés pour les séjours fréquents. Contactez-nous pour un devis personnalisé.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 px-8 py-4 border border-[#B8935A] text-[#B8935A] hover:bg-[#B8935A] hover:text-white transition-all duration-300 text-sm tracking-widest uppercase whitespace-nowrap"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    cat: "Réservation",
    items: [
      {
        q: "Comment réserver une chambre ?",
        a: "Vous pouvez réserver directement via notre formulaire en ligne, par téléphone au +33 3 20 00 00 00, ou par e-mail à reservation@urbanhouse-roubaix.fr. La confirmation est envoyée par e-mail sous 2h.",
      },
      {
        q: "Quelle est la politique d'annulation ?",
        a: "Toute réservation peut être annulée gratuitement jusqu'à 48h avant l'arrivée. En dessous de ce délai, la première nuit est facturée. Les tarifs non-remboursables bénéficient d'une réduction de 15%.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Oui. Nous acceptons les cartes bancaires (Visa, Mastercard, Amex) et les virements bancaires. Le paiement peut se faire à la réservation ou à l'arrivée selon le tarif choisi.",
      },
    ],
  },
  {
    cat: "Séjour",
    items: [
      {
        q: "Quels sont les horaires de check-in et check-out ?",
        a: "Le check-in standard est à partir de 15h et le check-out jusqu'à 11h. L'early check-in est possible dès 8h et le late check-out jusqu'à 16h, sous réserve de disponibilité et sans frais supplémentaires.",
      },
      {
        q: "L'hôtel accepte-t-il les animaux ?",
        a: "Nous acceptons les chiens de petite taille (moins de 8 kg) dans certaines chambres, avec un supplément de 15€/nuit. Merci de le mentionner lors de la réservation.",
      },
      {
        q: "Y a-t-il un parking à l'hôtel ?",
        a: "Oui, notre parking sécurisé de 45 places est disponible au tarif de 12€/nuit. Il est équipé de 6 bornes de recharge électrique. La réservation à l'avance est conseillée.",
      },
    ],
  },
  {
    cat: "Coworking & Business",
    items: [
      {
        q: "L'espace coworking est-il accessible aux non-résidents ?",
        a: "Absolument. L'espace coworking est ouvert à tous, résidents ou non. Le tarif journée est de 18€, la semaine à 79€. Les salles de réunion sont disponibles à 25€/h (min. 2h).",
      },
      {
        q: "Puis-je organiser un séminaire ou un événement d'entreprise ?",
        a: "Oui, nous proposons des forfaits séminaires adaptés à vos besoins : salles modulables de 4 à 40 personnes, matériel audiovisuel, pause-café et repas d'affaires. Contactez-nous pour un devis personnalisé.",
      },
      {
        q: "Proposez-vous des tarifs entreprises ?",
        a: "Oui. Urban House propose des contrats entreprise avec tarifs négociés, facturation centralisée et accès prioritaire au coworking. Contactez-nous à contact@urbanhouse-roubaix.fr pour discuter de vos besoins.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E4DC] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-[#131210] group-hover:text-[#B8935A] transition-colors"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.5 }}
        >
          {q}
        </span>
        <div className="w-8 h-8 border border-[#E8E4DC] flex items-center justify-center shrink-0 group-hover:border-[#B8935A] transition-colors">
          {open
            ? <Minus className="w-3.5 h-3.5 text-[#B8935A]" strokeWidth={2} />
            : <Plus className="w-3.5 h-3.5 text-[#7A7568] group-hover:text-[#B8935A]" strokeWidth={2} />
          }
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="text-[#7A7568] pb-5 pr-12"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.85 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="faq" className="bg-[#131210] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                FAQ
              </span>
            </div>
            <h2
              className="text-white mb-8"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Vos questions,<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>nos réponses.</em>
            </h2>

            {/* Category tabs */}
            <div className="flex flex-col gap-1">
              {faqs.map((cat, i) => (
                <button
                  key={cat.cat}
                  onClick={() => setActiveTab(i)}
                  className={`text-left px-4 py-3 transition-all duration-200 text-sm ${
                    activeTab === i
                      ? "bg-[#B8935A] text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}
                >
                  {cat.cat}
                </button>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/30 text-xs mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Vous ne trouvez pas la réponse ?
              </p>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[#B8935A] text-sm hover:underline"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Contactez-nous →
              </button>
            </div>
          </div>

          {/* Right: questions */}
          <div className="lg:col-span-3 bg-white p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p
                  className="text-[#B8935A] text-xs tracking-widest uppercase mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {faqs[activeTab].cat}
                </p>
                {faqs[activeTab].items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

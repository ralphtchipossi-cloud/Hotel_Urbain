import { useState } from "react";

const roomOptions = ["Urban Standard — 89€/nuit", "Urban Confort — 129€/nuit", "Urban Suite — 189€/nuit"];

export function Reservation() {
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "",
    arrivee: "", depart: "", chambre: "", adultes: "1", enfants: "0", message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reservation" className="bg-[#EEEBE4] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left info panel */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Réservation
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#131210",
                lineHeight: 1.1,
              }}
            >
              Réservez<br />
              <em style={{ fontStyle: "italic", color: "#B8935A" }}>votre séjour.</em>
            </h2>
            <p className="text-[#7A7568] mt-6 mb-10 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.85 }}>
              Remplissez le formulaire ci-contre et notre équipe vous confirme votre réservation sous 2h. Paiement à l'hôtel ou en ligne sécurisé.
            </p>

            {/* Guarantees */}
            {[
              { icon: "✓", label: "Annulation gratuite 48h avant" },
              { icon: "✓", label: "Meilleur tarif garanti" },
              { icon: "✓", label: "Confirmation immédiate par e-mail" },
              { icon: "✓", label: "Paiement sécurisé à l'hôtel" },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-3 mb-3">
                <span className="text-[#B8935A] text-sm">{g.icon}</span>
                <span className="text-[#7A7568] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{g.label}</span>
              </div>
            ))}

            {/* Divider */}
            <div className="mt-10 pt-8 border-t border-[#E8E4DC]">
              <p className="text-[#131210] text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}>
                Préférez appeler ?
              </p>
              <a href="tel:+33320000000" className="text-[#B8935A] hover:underline" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.3rem", fontWeight: 300 }}>
                +33 3 20 00 00 00
              </a>
              <p className="text-[#7A7568] text-xs mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Disponible 7j/7 de 8h à 22h
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 border border-[#B8935A] flex items-center justify-center mb-6">
                  <span className="text-[#B8935A] text-2xl">✓</span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 300, color: "#131210" }}>
                  Demande envoyée !
                </h3>
                <p className="text-[#7A7568] mt-3 max-w-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.8 }}>
                  Notre équipe vous contacte sous 2h pour confirmer votre réservation. Merci de votre confiance.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 border border-[#131210] text-[#131210] hover:bg-[#131210] hover:text-white transition-all text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Nouvelle réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Prénom *
                    </label>
                    <input
                      name="prenom" required value={form.prenom} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                      placeholder="Jean"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Nom *
                    </label>
                    <input
                      name="nom" required value={form.nom} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      E-mail *
                    </label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                      placeholder="jean@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Téléphone
                    </label>
                    <input
                      name="telephone" value={form.telephone} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                </div>

                {/* Dates row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Arrivée *
                    </label>
                    <input
                      name="arrivee" type="date" required value={form.arrivee} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Départ *
                    </label>
                    <input
                      name="depart" type="date" required value={form.depart} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                {/* Room + guests */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 sm:col-span-1 flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Chambre *
                    </label>
                    <select
                      name="chambre" required value={form.chambre} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors appearance-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    >
                      <option value="">Choisir...</option>
                      {roomOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Adultes
                    </label>
                    <select
                      name="adultes" value={form.adultes} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    >
                      {["1","2","3","4"].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Enfants
                    </label>
                    <select
                      name="enfants" value={form.enfants} onChange={handleChange}
                      className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    >
                      {["0","1","2","3"].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#131210] text-xs tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Demandes particulières
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="bg-[#F4F2EE] border-0 border-b-2 border-[#E8E4DC] focus:border-[#B8935A] outline-none px-0 py-3 text-[#131210] transition-colors resize-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem" }}
                    placeholder="Arrivée tardive, chambre non-fumeur, berceau enfant..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-4 bg-[#131210] text-white hover:bg-[#B8935A] transition-all duration-300 text-sm tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

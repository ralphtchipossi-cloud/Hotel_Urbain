export function Footer() {
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Vous recevrez nos offres exclusives.");
  };

  return (
    <footer className="bg-[#0C0B09] py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-[#B8935A] flex items-center justify-center">
                <span className="text-[#B8935A] text-xs tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>UH</span>
              </div>
              <span className="text-white tracking-[0.25em] uppercase text-sm" style={{ fontFamily: "'Fraunces', serif" }}>
                Urban House
              </span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Hôtel business & moderne.<br />Roubaix, France.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {["Ig", "Tk", "Fb"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#B8935A] hover:text-[#B8935A] transition-colors cursor-pointer"
                >
                  <span className="text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s}</span>
                </div>
              ))}
            </div>

            {/* NEWSLETTER - AJOUTÉE */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/20 text-xs mb-2">✨ Offre exclusive en avant-première ?</p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  required
                  className="bg-white/5 border border-white/10 p-2 text-xs flex-1 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8935A]"
                />
                <button 
                  type="submit"
                  className="bg-[#B8935A] px-3 py-2 text-xs text-white hover:bg-[#A0803F] transition-colors whitespace-nowrap"
                >
                  Je m'inscris
                </button>
              </form>
              <p className="text-white/20 text-[9px] mt-2">Sans spam. Désinscription 1 clic.</p>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Navigation</p>
            {["Accueil", "Chambres", "Coworking", "Services", "Réservation", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  const id = l === "Réservation" ? "#reservation" : `#${l.toLowerCase()}`;
                  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block text-white/40 hover:text-[#B8935A] transition-colors text-xs mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.05em" }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Services */}
          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Services</p>
            {["Wi-Fi Fibre", "Coworking 24h/24", "Parking", "Restaurant & Bar", "Fitness", "Conciergerie"].map((s) => (
              <p key={s} className="text-white/40 text-xs mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {s}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</p>
            <p className="text-white/40 text-xs mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12 Rue de la République</p>
            <p className="text-white/40 text-xs mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>59100 Roubaix, France</p>
            <a href="tel:+33320000000" className="text-[#B8935A] text-xs hover:underline block mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              +33 3 20 00 00 00
            </a>
            <a href="mailto:reception@hotel-rbx.fr" className="text-[#B8935A] text-xs hover:underline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              reception@hotel-rbx.fr
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © {year} Urban House — Roubaix. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "Politique de confidentialité", "CGV"].map((l) => (
              <span key={l} className="text-white/20 text-xs cursor-pointer hover:text-white/40 transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
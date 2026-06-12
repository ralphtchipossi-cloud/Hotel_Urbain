export function Footer() {
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Vous recevrez nos offres exclusives.");
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0C0B09] pt-16 pb-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top row - 5 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Colonne 1 - Marque avec logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/logo.png" 
                alt="Urban House Logo" 
                className="h-8 w-auto object-contain"
              />
              <span className="text-white tracking-[0.2em] uppercase text-sm font-light">
                URBAN HOUSE
              </span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed mb-4">
              Hôtel business & moderne<br />Roubaix, France
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-white/5 transition-all duration-300 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-white/5 transition-all duration-300 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-white/5 transition-all duration-300 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">Navigation</h4>
            <ul className="space-y-2">
              {["Accueil", "Chambres", "Coworking", "Services", "Réservation", "Urban Club", "Contact"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => {
                      if (l === "Urban Club") {
                        window.location.href = "/urban-club";
                      } else {
                        const id = l === "Réservation" ? "#reservation" : `#${l.toLowerCase()}`;
                        scrollTo(id);
                      }
                    }}
                    className="text-white/40 hover:text-[#B8935A] text-xs transition-colors duration-200"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div>
            <h4 className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">Services</h4>
            <ul className="space-y-2">
              {["Wi-Fi Fibre", "Coworking 24h/24", "Parking sécurisé", "Restaurant & Bar", "Fitness", "Conciergerie"].map((s) => (
                <li key={s} className="text-white/40 text-xs">{s}</li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h4 className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-white/40">12 Rue de la République</li>
              <li className="text-white/40">59100 Roubaix, France</li>
              <li className="pt-2">
                <a href="tel:+33320000000" className="text-[#B8935A] hover:underline">+33 3 20 00 00 00</a>
              </li>
              <li>
                <a href="mailto:contact@urbanhouseroubaix.fr" className="text-[#B8935A] hover:underline">contact@urbanhouseroubaix.fr</a>
              </li>
            </ul>
          </div>

          {/* Colonne 5 - Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-white/30 text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">Newsletter</h4>
            <p className="text-white/30 text-[11px] mb-3">Offres exclusives en avant-première</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                required
                className="bg-white/5 border border-white/15 p-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#B8935A] transition-colors"
              />
              <button 
                type="submit"
                className="bg-[#B8935A] py-2.5 text-xs text-white hover:bg-[#A0803F] transition-colors"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-white/20 text-[9px] mt-2">Sans spam. Désinscription 1 clic.</p>
          </div>
        </div>

        {/* Bottom row - copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[11px]">
            © {year} Urban House — Roubaix. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "Politique de confidentialité", "CGV"].map((l) => (
              <button key={l} className="text-white/20 text-[11px] hover:text-white/40 transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
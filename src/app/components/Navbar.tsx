import { useState, useEffect } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Chambres", href: "#chambres" },
  { label: "Coworking", href: "#coworking" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#131210]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo avec adaptatif light/dark */}
        <button onClick={() => handleNav("#accueil")} className="flex items-center">
          <Logo variant={scrolled ? "dark" : "light"} size="sm" showText={true} />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-white/70 hover:text-[#B8935A] transition-colors text-sm tracking-widest uppercase font-light"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.12em" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#reservation")}
            className="ml-4 px-6 py-2 bg-[#B8935A] text-white text-sm tracking-widest uppercase hover:bg-[#A0803F] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.12em" }}
          >
            Réserver
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 bg-[#131210]/98 backdrop-blur-md ${
          menuOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-white/80 hover:text-[#B8935A] transition-colors text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#reservation")}
            className="px-8 py-3 bg-[#B8935A] text-white text-sm tracking-widest uppercase hover:bg-[#A0803F] transition-colors w-full text-center"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Réserver
          </button>
        </div>
      </div>
    </nav>
  );
}
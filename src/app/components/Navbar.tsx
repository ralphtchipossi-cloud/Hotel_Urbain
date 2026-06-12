import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const links = [
  { label: "Accueil", href: "#accueil", isPage: false },
  { label: "Chambres", href: "#chambres", isPage: false },
  { label: "Coworking", href: "#coworking", isPage: false },
  { label: "Services", href: "#services", isPage: false },
  { label: "Urban Club", href: "/urban-club", isPage: true },
  { label: "Contact", href: "#contact", isPage: false },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Vérifier si on est sur la page d'accueil
  const isHomePage = location.pathname === "/";

  // Déterminer si on doit avoir un fond clair
  const hasLightBackground = !isHomePage || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string, isPage: boolean) => {
    setMenuOpen(false);
    if (isPage) {
      navigate(href);
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  // Styles adaptatifs
  const navBg = hasLightBackground ? "bg-white shadow-md" : "bg-transparent";
  const textColor = hasLightBackground ? "text-[#131210]" : "text-white";
  const linkColor = hasLightBackground 
    ? "text-[#131210]/70 hover:text-[#B8935A]" 
    : "text-white/70 hover:text-[#B8935A]";
  const mobileMenuBg = hasLightBackground ? "bg-white shadow-lg" : "bg-[#131210]/98 backdrop-blur-md";
  const mobileLinkColor = hasLightBackground 
    ? "text-[#131210]/80 hover:text-[#B8935A]" 
    : "text-white/80 hover:text-[#B8935A]";
  const hamburgerColor = hasLightBackground ? "bg-[#131210]" : "bg-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo Image + Texte URBAN HOUSE */}
        <button
          onClick={() => handleNav("#accueil", false)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img 
            src="/logo.png" 
            alt="Urban House Logo" 
            className="h-8 w-auto object-contain"
          />
          <span className={`${textColor} tracking-[0.25em] uppercase text-sm font-light transition-colors duration-300`}>
            URBAN HOUSE
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href, l.isPage)}
              className={`${linkColor} transition-colors text-sm tracking-widest uppercase font-light`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#reservation", false)}
            className="ml-4 px-6 py-2 bg-[#B8935A] text-white text-sm tracking-widest uppercase hover:bg-[#A0803F] transition-colors"
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
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""} ${hamburgerColor}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""} ${hamburgerColor}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""} ${hamburgerColor}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${mobileMenuBg} ${
          menuOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href, l.isPage)}
              className={`${mobileLinkColor} transition-colors text-sm tracking-widest uppercase`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#reservation", false)}
            className="px-8 py-3 bg-[#B8935A] text-white text-sm tracking-widest uppercase hover:bg-[#A0803F] transition-colors w-full text-center"
          >
            Réserver
          </button>
        </div>
      </div>
    </nav>
  );
}
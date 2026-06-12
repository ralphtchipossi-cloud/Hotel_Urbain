// src/app/pages/UrbanClub.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Gift, Coffee, Wifi, Clock, Star, ChevronRight, CheckCircle } from 'lucide-react';

export function UrbanClub() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'register' | 'login'>('benefits');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const savedMember = localStorage.getItem('urbanClubMember');
    if (savedMember) {
      setIsLoggedIn(true);
      setMember(JSON.parse(savedMember));
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const members = JSON.parse(localStorage.getItem('urbanClubMembers') || '[]');
    
    if (members.find((m: any) => m.email === formData.email)) {
      setError('Cet email est déjà inscrit');
      setSuccess('');
      return;
    }

    const newMember = { 
      ...formData, 
      id: Date.now(), 
      joinDate: new Date().toISOString(),
      tier: 'Silver',
      points: 0,
      bookings: []
    };
    members.push(newMember);
    localStorage.setItem('urbanClubMembers', JSON.stringify(members));
    localStorage.setItem('urbanClubMember', JSON.stringify(newMember));
    setIsLoggedIn(true);
    setMember(newMember);
    setError('');
    setSuccess('✨ Inscription réussie ! Bienvenue dans l\'Urban Club !');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const members = JSON.parse(localStorage.getItem('urbanClubMembers') || '[]');
    const found = members.find((m: any) => m.email === loginData.email && m.password === loginData.password);
    
    if (found) {
      localStorage.setItem('urbanClubMember', JSON.stringify(found));
      setIsLoggedIn(true);
      setMember(found);
      setError('');
      setSuccess('✅ Connexion réussie !');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Email ou mot de passe incorrect');
      setSuccess('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('urbanClubMember');
    setIsLoggedIn(false);
    setMember(null);
    setSuccess('🔓 Déconnexion réussie');
    setTimeout(() => setSuccess(''), 3000);
  };

  const benefits = [
    { icon: Crown, title: "Statut privilégié", desc: "Accès aux étages exclusifs et surclassement sous réserve de disponibilité", color: "#B8935A" },
    { icon: Gift, title: "-10% à vie", desc: "Sur toutes vos réservations, toute l'année", color: "#B8935A" },
    { icon: Coffee, title: "Petit-déjeuner offert", desc: "Pour tout séjour de 2 nuits ou plus", color: "#B8935A" },
    { icon: Wifi, title: "Wi-Fi premium", desc: "Connexion fibre ultra-rapide prioritaire", color: "#B8935A" },
    { icon: Clock, title: "Check-in/out flexible", desc: "Early check-in et late check-out selon disponibilité", color: "#B8935A" },
    { icon: Star, title: "Points fidélité", desc: "1 point = 1€ dépensé, cumulez pour des nuits gratuites", color: "#B8935A" },
  ];

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8935A]" />
              <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase">Mon compte</span>
              <div className="w-8 h-px bg-[#B8935A]" />
            </div>
            <h1 className="text-4xl font-light text-[#131210] font-['Fraunces',serif]">
              Bonjour <span className="text-[#B8935A]">{member?.name}</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte membre */}
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-[#131210] to-[#1E1D1A] p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-[#B8935A]" />
                  <span className="text-white text-sm tracking-wider">Urban Club</span>
                </div>
                <div className="border-t border-white/20 my-4 pt-4">
                  <p className="text-white/60 text-xs">Membre depuis</p>
                  <p className="text-white text-sm">{new Date(member?.joinDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="border-t border-white/20 my-4 pt-4">
                  <p className="text-white/60 text-xs">Points cumulés</p>
                  <p className="text-white text-2xl font-light">{member?.points || 0} <span className="text-xs text-white/40">points</span></p>
                </div>
                <div className="border-t border-white/20 my-4 pt-4">
                  <p className="text-white/60 text-xs">Prochain palier</p>
                  <div className="mt-2 h-1 bg-white/20 rounded-full">
                    <div className="w-1/3 h-1 bg-[#B8935A] rounded-full" />
                  </div>
                  <p className="text-white/40 text-[10px] mt-1">Encore 500 points pour Gold</p>
                </div>
              </div>
            </div>

            {/* Avantages et actions */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6">
                <h3 className="text-lg font-light mb-4">Vos avantages</h3>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <b.icon className="w-5 h-5 text-[#B8935A]" />
                      <div>
                        <p className="text-[#131210] text-sm font-medium">{b.title}</p>
                        <p className="text-[#7A7568] text-xs">{b.desc.split(',')[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-[#B8935A] text-white py-3 hover:bg-[#A0803F] transition text-sm tracking-wider"
                >
                  Réserver avec -10%
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 border border-[#131210] text-[#131210] py-3 hover:bg-[#131210] hover:text-white transition text-sm tracking-wider"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#7A7568] text-sm hover:text-[#B8935A] transition"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F2EE] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#B8935A]" />
            <span className="text-[#B8935A] text-xs tracking-[0.3em] uppercase">Programme de fidélité</span>
            <div className="w-8 h-px bg-[#B8935A]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#131210] font-['Fraunces',serif] mb-4">
            Urban Club
          </h1>
          <p className="text-[#7A7568] max-w-2xl mx-auto">
            Rejoignez notre programme de fidélité et profitez d'avantages exclusifs à chaque séjour.
            <span className="block text-[#B8935A] text-sm mt-2">Inscription gratuite et immédiate</span>
          </p>
        </div>

        {/* Avantages */}
        <div className="mb-16">
          <div className="flex justify-center gap-8 mb-8">
            {['BENEFITS', 'INSCRIPTION', 'CONNEXION'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i === 0 ? 'benefits' : i === 1 ? 'register' : 'login')}
                className={`pb-2 text-sm tracking-widest transition-colors ${
                  (activeTab === 'benefits' && i === 0) ||
                  (activeTab === 'register' && i === 1) ||
                  (activeTab === 'login' && i === 2)
                    ? 'text-[#B8935A] border-b border-[#B8935A]'
                    : 'text-[#7A7568] hover:text-[#B8935A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'benefits' && (
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white p-6 text-center group hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#F4F2EE] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#B8935A]/10 transition">
                    <b.icon className="w-6 h-6 text-[#B8935A]" />
                  </div>
                  <h3 className="font-medium text-[#131210] mb-2">{b.title}</h3>
                  <p className="text-[#7A7568] text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'register' && (
            <div className="max-w-md mx-auto bg-white p-8">
              {success && <div className="mb-4 p-3 bg-green-100 text-green-700 text-center text-sm">{success}</div>}
              <h3 className="text-xl font-light mb-6 text-center">✨ Créer mon compte Urban Club</h3>
              <form onSubmit={handleRegister} className="space-y-4">
                <input type="text" placeholder="Nom complet *" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                <input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                <input type="password" placeholder="Mot de passe *" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                <input type="text" placeholder="Entreprise (optionnel)" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                <input type="tel" placeholder="Téléphone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-[#B8935A] text-white py-3 hover:bg-[#A0803F] transition">S'inscrire gratuitement</button>
              </form>
              <p className="text-center text-[#7A7568] text-xs mt-4">🎁 -10% immédiat sur votre première réservation</p>
            </div>
          )}

          {activeTab === 'login' && (
            <div className="max-w-md mx-auto bg-white p-8">
              <h3 className="text-xl font-light mb-6 text-center">🔐 Déjà membre ?</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" placeholder="Email *" required value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                <input type="password" placeholder="Mot de passe *" required value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full border border-[#B8935A] text-[#B8935A] py-3 hover:bg-[#B8935A] hover:text-white transition">Se connecter</button>
              </form>
            </div>
          )}
        </div>

        {/* Section fidélité */}
        <div className="bg-[#131210] text-white p-8 text-center">
          <h3 className="text-xl font-light mb-2">Le programme qui récompense vos voyages</h3>
          <p className="text-white/40 text-sm mb-4">1 point = 1€ dépensé. Échangez vos points contre des nuits gratuites.</p>
          <div className="flex justify-center gap-2 text-xs">
            <span className="px-3 py-1 bg-white/10">Silver</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="px-3 py-1 bg-[#B8935A] text-white">Gold</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className="px-3 py-1 bg-white/10">Platinum</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-[#7A7568] text-sm hover:text-[#B8935A] transition">← Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}
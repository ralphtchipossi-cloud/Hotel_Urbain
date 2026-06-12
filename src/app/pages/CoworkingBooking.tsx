// src/app/pages/CoworkingBooking.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CoworkingBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    duration: 'day', // day, week, meeting
  });
  const [loading, setLoading] = useState(false);

  const prices = {
    day: 18,
    week: 79,
    meeting: 25,
  };

  const getPriceLabel = () => {
    switch(formData.duration) {
      case 'day': return 'Journée (18€)';
      case 'week': return 'Semaine (79€)';
      case 'meeting': return 'Salle réunion (25€/h)';
      default: return '18€';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Sauvegarder dans localStorage
    const bookings = JSON.parse(localStorage.getItem('coworkingBookings') || '[]');
    bookings.push({
      id: Date.now(),
      ...formData,
      price: prices[formData.duration as keyof typeof prices],
      status: 'confirmé',
      dateReservation: new Date().toISOString(),
    });
    localStorage.setItem('coworkingBookings', JSON.stringify(bookings));

    setLoading(false);
    navigate('/coworking-confirmation', { state: { booking: formData, price: prices[formData.duration as keyof typeof prices] } });
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8">
          <h2 className="text-2xl font-light mb-6">Réserver un espace coworking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Nom complet *" required value={formData.name} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <input type="tel" name="phone" placeholder="Téléphone *" required value={formData.phone} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <input type="date" name="date" placeholder="Date" required value={formData.date} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <select name="duration" value={formData.duration} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]">
              <option value="day">Journée – 18€</option>
              <option value="week">Semaine – 79€</option>
              <option value="meeting">Salle réunion – 25€/h</option>
            </select>
            <button type="submit" disabled={loading} className="w-full bg-[#B8935A] text-white py-3 hover:bg-[#A0803F] transition">
              {loading ? 'Traitement...' : `Réserver - ${getPriceLabel()}`}
            </button>
            <button
  type="button"
  onClick={() => navigate('/')}
  className="w-full border border-[#131210] text-[#131210] py-3 hover:bg-[#131210] hover:text-white transition mt-2"
>
  ← Annuler
</button>
          </form>
        </div>
        <div className="bg-[#131210] text-white p-8 h-fit">
          <h3 className="text-xl font-light mb-4">Espace Coworking</h3>
          <p className="text-white/60 text-sm mb-4">Accès 24h/24, wifi fibre, café inclus</p>
          <div className="space-y-2 text-sm">
            <p>📅 Journée : 18€ (offert pour résidents)</p>
            <p>📆 Semaine : 79€ (accès illimité)</p>
            <p>👥 Salle réunion : 25€/h (dès 2h)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
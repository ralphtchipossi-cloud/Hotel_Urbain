import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get('room') || 'Chambre';
  const price = searchParams.get('price') || '0';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    adults: 1,
    children: 0,
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bookingData');
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...data }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem('bookingData', JSON.stringify({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          room: room,
          checkin: formData.checkin,
          checkout: formData.checkout,
          adults: formData.adults,
          children: formData.children,
          specialRequests: formData.specialRequests,
          totalAmount: parseInt(price),
          paymentIntentId: 'payment_at_hotel',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la réservation');
      }

      localStorage.removeItem('bookingData');
      navigate('/confirmation', {
        state: {
          room,
          price,
          dates: { checkin: formData.checkin, checkout: formData.checkout },
          name: formData.name,
          email: formData.email,
        },
      });
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Formulaire */}
        <div className="bg-white p-8">
          <h2 className="text-2xl font-light mb-6">Vos informations</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom complet *"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="checkin"
                required
                value={formData.checkin}
                onChange={handleChange}
                className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]"
              />
              <input
                type="date"
                name="checkout"
                required
                value={formData.checkout}
                onChange={handleChange}
                className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select name="adults" value={formData.adults} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]">
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} adulte{n > 1 ? 's' : ''}</option>)}
              </select>
              <select name="children" value={formData.children} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]">
                <option value="0">0 enfant</option>
                {[1, 2, 3].map(n => <option key={n} value={n}>{n} enfant{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <textarea
              name="specialRequests"
              placeholder="Demandes particulières (arrivée tardive, bébé, etc.)"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A] resize-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B8935A] text-white py-3 hover:bg-[#A0803F] transition"
            >
              {loading ? 'Traitement en cours...' : `Confirmer la réservation - ${price}€`}
            </button>
            {/* Bouton Annuler */}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full border border-[#131210] text-[#131210] py-3 hover:bg-[#131210] hover:text-white transition mt-2"
            >
              ← Annuler
            </button>
          </form>
          <p className="text-center text-[#7A7568] text-xs mt-4">
            🔒 Paiement sécurisé à l'arrivée à l'hôtel
          </p>
        </div>

        {/* Résumé */}
        <div className="bg-[#131210] text-white p-8 h-fit">
          <h3 className="text-xl font-light mb-4">Votre réservation</h3>
          <p className="text-[#B8935A] mb-2">{room}</p>
          <p className="text-white/60 text-sm mb-4">Du {formData.checkin || '--'} au {formData.checkout || '--'}</p>
          <div className="border-t border-white/20 pt-4 mt-4">
            <div className="flex justify-between">
              <span>Total à payer à l'arrivée</span>
              <span className="text-xl">{price}€</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/40 text-xs">✅ Annulation gratuite 48h avant</p>
            <p className="text-white/40 text-xs mt-1">✅ Meilleur tarif garanti</p>
            <p className="text-white/40 text-xs mt-1">✅ Confirmation immédiate par email</p>
          </div>
        </div>
      </div>
    </div>
  );
}
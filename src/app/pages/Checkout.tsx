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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    localStorage.setItem('bookingData', JSON.stringify({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulation de paiement (en attendant Stripe)
    setTimeout(() => {
      // Sauvegarder la réservation en local
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      reservations.push({
        id: Date.now(),
        ...formData,
        room,
        price,
        status: 'confirmé',
        date: new Date().toISOString(),
      });
      localStorage.setItem('reservations', JSON.stringify(reservations));
      
      // Rediriger vers confirmation
      navigate('/confirmation', { state: { room, price, dates: { checkin: formData.checkin, checkout: formData.checkout } } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Formulaire */}
        <div className="bg-white p-8">
          <h2 className="text-2xl font-light mb-6">Vos informations</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Nom complet *" required value={formData.name} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <input type="tel" name="phone" placeholder="Téléphone *" required value={formData.phone} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="checkin" placeholder="Arrivée" required value={formData.checkin} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
              <input type="date" name="checkout" placeholder="Départ" required value={formData.checkout} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select name="adults" value={formData.adults} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]">
                {[1,2,3,4].map(n => <option key={n} value={n}>{n} adulte{n>1?'s':''}</option>)}
              </select>
              <select name="children" value={formData.children} onChange={handleChange} className="w-full p-3 border border-[#E8E4DC] focus:outline-none focus:border-[#B8935A]">
                <option value="0">0 enfant</option>
                {[1,2,3].map(n => <option key={n} value={n}>{n} enfant{n>1?'s':''}</option>)}
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-[#B8935A] text-white py-3 hover:bg-[#A0803F] transition">
              {loading ? 'Traitement en cours...' : `Confirmer la réservation - ${price}€`}
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
        </div>
      </div>
    </div>
  );
}
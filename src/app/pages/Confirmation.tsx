import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function Confirmation() {
  const { state } = useLocation();
  const { room, price, dates } = state || {};

  return (
    <div className="min-h-screen bg-[#F4F2EE] py-32 px-6 text-center">
      <div className="max-w-lg mx-auto bg-white p-12">
        <CheckCircle className="w-20 h-20 text-[#B8935A] mx-auto mb-6" />
        <h1 className="text-3xl font-light mb-4">Réservation confirmée !</h1>
        <p className="text-[#7A7568] mb-6">Un email de confirmation vous sera envoyé sous 24h.</p>
        <div className="bg-[#F4F2EE] p-4 mb-6 text-left">
          <p><strong>Chambre :</strong> {room}</p>
          <p><strong>Dates :</strong> {dates?.checkin} → {dates?.checkout}</p>
          <p><strong>Montant :</strong> {price}€ à payer à l'arrivée</p>
        </div>
        <Link to="/" className="inline-block bg-[#B8935A] text-white px-8 py-3 hover:bg-[#A0803F] transition">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
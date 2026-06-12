const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// === Base de données SQLite ===
const db = new sqlite3.Database(path.join(__dirname, 'reservations.db'));
db.run(`CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  room TEXT,
  checkin TEXT,
  checkout TEXT,
  adults INTEGER,
  children INTEGER,
  special_requests TEXT,
  total_amount INTEGER,
  status TEXT,
  stripe_payment_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// === Configuration email ===
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Urban House" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email envoyé à ${to}`);
  } catch (error) {
    console.error('❌ Erreur email:', error);
  }
}

// === ROUTES API ===

// 1. Créer une intention de paiement Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', metadata } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe utilise les centimes
      currency,
      metadata,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Sauvegarder réservation après paiement
app.post('/api/reservations', async (req, res) => {
  const { name, email, phone, room, checkin, checkout, adults, children, specialRequests, totalAmount, paymentIntentId } = req.body;
  
  db.run(
    `INSERT INTO reservations (name, email, phone, room, checkin, checkout, adults, children, special_requests, total_amount, status, stripe_payment_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, room, checkin, checkout, adults, children, specialRequests, totalAmount, 'confirmed', paymentIntentId],
    async function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Email au client
      await sendEmail(
        email,
        '✅ Confirmation de votre réservation - Urban House',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #B8935A;">Merci pour votre réservation !</h2>
          <p>Bonjour <strong>${name}</strong>,</p>
          <p>Votre réservation à l'<strong>Urban House</strong> est confirmée.</p>
          <hr/>
          <p><strong>Chambre :</strong> ${room}</p>
          <p><strong>Dates :</strong> du ${checkin} au ${checkout}</p>
          <p><strong>Montant payé :</strong> ${totalAmount}€</p>
          <hr/>
          <p>À très bientôt à Roubaix !</p>
          <p>L'équipe Urban House</p>
        </div>
        `
      );
      
      // Email à l'hôtel
      await sendEmail(
        process.env.EMAIL_USER,
        '🟢 NOUVELLE RÉSERVATION - Urban House',
        `
        <h2>Nouvelle réservation</h2>
        <p><strong>Client :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Tél :</strong> ${phone}</p>
        <p><strong>Chambre :</strong> ${room}</p>
        <p><strong>Dates :</strong> ${checkin} → ${checkout}</p>
        <p><strong>Montant :</strong> ${totalAmount}€</p>
        <p><strong>Paiement Stripe ID :</strong> ${paymentIntentId}</p>
        `
      );
      
      res.json({ id: this.lastID, message: 'Réservation confirmée' });
    }
  );
});

// 3. Formulaire de contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  await sendEmail(
    process.env.EMAIL_USER,
    `📩 Message de ${name} - Urban House`,
    `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> ${email}</p><p><strong>Message :</strong><br/>${message}</p>`
  );
  
  res.json({ message: 'Message envoyé' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Back-end Urban House sur http://localhost:${PORT}`);
});
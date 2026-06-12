# Urban House – Hôtel Business & Moderne

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?logo=stripe)](https://stripe.com/)

## À propos

Urban House est un hôtel nouvelle génération situé à **Roubaix**, conçu pour les **professionnels**, les **city-breakers** et les **jeunes actifs**.

**Positionnement :**
- Urbain
- Business
- Moderne & fonctionnel
- Premium accessible

**Inspirations :** CitizenM, Mama Shelter, OKKO Hotels, Pullman, Moxy

**Site web :** [urbanhouseroubaix.fr](https://urbanhouseroubaix.fr)

---

## Technologies utilisées

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| React | 18.3.1 | UI components |
| TypeScript | 5.x | Typage sécurisé |
| Vite | 6.3.5 | Build tool & dev server |
| Tailwind CSS | 4.1.12 | Styling utilitaire |
| Framer Motion | 12.23.24 | Animations |
| Radix UI | multiples | Composants accessibles |
| Lucide React | 0.487.0 | Icônes |
| Node.js + Express | - | Back-end API |
| SQLite | - | Base de données |
| Stripe | - | Paiements (mode test) |
| Nodemailer | - | Envoi d'emails |

---

## Installation

### Prérequis

- **Node.js** 18+ (recommandé : 20.x LTS)
- **npm** ou **pnpm**

### Étapes

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd Hotel_Urbain_Roubaix

# 2. Installer les dépendances front-end
npm install

# 3. Installer les dépendances back-end
cd server
npm install express cors dotenv stripe nodemailer sqlite3
cd ..

# 4. Configurer les variables d'environnement
# Créer un fichier server/.env (voir exemple ci-dessous)

# 5. Lancer le back-end (terminal 1)
cd server
node index.js

# 6. Lancer le front-end (terminal 2)
npm run dev
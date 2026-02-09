import React from 'react';

// --- TYPES ---
export interface Wifi {
  network: string;
  password: string;
}

export interface ManualItem {
  category: string;
  title: string;
  content: string;
}

export interface CheckinStep {
  title: string;
  desc: string;
}

export interface CheckinData {
  keyboxCode: string;
  steps: CheckinStep[];
}

export interface EmergencyData {
  police: string;
  ambulance: string;
  hostPhone: string;
}

export interface Recommendation {
  id: number;
  title: string;
  category: string;
  desc: string;
  images: string[]; // <-- Array d tsawer
  mapLink: string;
}

export interface GuideData {
  hostName: string;
  hostAvatar: string;
  guestName: string;
  airbnbLink: string;
  wifi: Wifi;
  manual: ManualItem[];
  checkin: CheckinData;
  emergency: EmergencyData;
  recommendations: Recommendation[];
}

// --- DATA (UPDATED WITH CAROUSEL IMAGES) ---
export const guideData: GuideData = {
  hostName: 'Nizar Apartments',
  hostAvatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  guestName: 'Guest',
  airbnbLink: 'https://www.airbnb.com/rooms/YOUR_ROOM_ID',
  wifi: { network: 'Malabata_Guest_5G', password: 'Tanger2026(Free)' },
  manual: [
    {
      category: 'Climate',
      title: 'Air Conditioner',
      content:
        'Remote is on the wall. Keep windows closed when AC is ON. Eco-setting: 24°C.',
    },
    {
      category: 'Appliances',
      title: 'Washing Machine',
      content: 'Quick wash is "Programme 4". Detergent is under the sink.',
    },
    {
      category: 'Services',
      title: 'Trash / Poubelle',
      content:
        'Green bins are outside the gate to the right. Daily pickup at 9 PM.',
    },
  ],
  checkin: {
    keyboxCode: '2026',
    steps: [
      { title: 'Arrival', desc: 'Resid. Malabata View, Ave Mohamed VI.' },
      { title: 'Building', desc: "Code: '1234' + Bell to open glass door." },
      {
        title: 'Keybox',
        desc: 'Handle of Apt 14 (3rd Floor). Enter code above.',
      },
      { title: 'WiFi', desc: 'QR code is on the fridge.' },
    ],
  },
  emergency: { police: '19', ambulance: '15', hostPhone: '+212 661 000 000' },
  recommendations: [
    {
      id: 1,
      title: 'Cafe Hafa',
      category: 'Must Visit',
      desc: 'Legendary tiered cafe with mint tea and views of Spain.',
      images: [
        'https://images.unsplash.com/photo-1564507204940-5e60e807186a?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1534234828563-025a1d2f8319?auto=format&fit=crop&q=80&w=600',
      ],
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 2,
      title: 'Restaurant Bachir',
      category: 'Food',
      desc: "Famous local spot for 'Poulet Citron'. Authentic & affordable.",
      images: [
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
      ],
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 3,
      title: 'Hercules Caves',
      category: 'Sightseeing',
      desc: 'Where the Atlantic meets the Mediterranean.',
      images: [
        'https://images.unsplash.com/photo-1574620608560-63973cb439e6?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
      ],
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 4,
      title: 'Marina Bay',
      category: 'Nightlife',
      desc: 'Evening walk, dinner, or clubbing.',
      images: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=600',
      ],
      mapLink: 'https://goo.gl/maps/xyz',
    },
  ],
};

// --- TRANSLATIONS ---
export const translations = {
  en: {
    welcome: 'Welcome,',
    enjoy: 'Enjoy your stay in Tangier.',
    hostedBy: 'Hosted by',
    online: 'Online',
    wifiTitle: 'WiFi Access',
    network: 'Network',
    password: 'Password',
    copy: 'Copy Password',
    copied: 'Copied!',
    checkinTitle: 'Check-in',
    houseGuideTitle: 'House Guide',
    localGemsTitle: 'Local Gems',
    helpTitle: 'Help',
    emergencyTitle: 'Emergency',
    police: 'Police',
    ambulance: 'Ambulance',
    manager: 'Property Manager',
    callHost: 'Call Host',
    available: 'Available 24/7',
    secureCode: 'Secure Keybox Code',
    hideCode: 'Hide Code',
    revealCode: 'Tap to Reveal',
    tangierFavs: 'Tangier Favorites',
    viewMap: 'View on Map',
    poweredBy: 'Powered by',
    feedbackTitle: 'Rate Your Stay',
    rating: 'How was your stay?',
    comment: 'Any feedback for us?',
    sendReview: 'Send Feedback (WhatsApp)',
    reviewOnAirbnb: 'Write Review on Airbnb ⭐️',
    badReviewNote: 'Let us fix it instantly on WhatsApp!',
    goodReviewNote: 'Your 5-star review helps us a lot!',
    aboutPlace: 'About this place',
    walk: 'Walk',
    ratings: 'Ratings',
    seeDetails: 'See Details',
    whatsappHost: 'WhatsApp Host', // <--- ZID HADI
    chatNow: 'Chat now',           // <--- ZID HADI
  },
  fr: {
    welcome: 'Bienvenue,',
    enjoy: 'Profitez de votre séjour à Tanger.',
    hostedBy: 'Hébergé par',
    online: 'En ligne',
    wifiTitle: 'Accès WiFi',
    network: 'Réseau',
    password: 'Mot de passe',
    copy: 'Copier le mot de passe',
    copied: 'Copié !',
    checkinTitle: 'Arrivée',
    houseGuideTitle: 'Manuel Maison',
    localGemsTitle: 'Lieux Tops',
    helpTitle: 'Aide',
    emergencyTitle: 'Urgence',
    police: 'Police',
    ambulance: 'Ambulance',
    manager: 'Gérant',
    callHost: "Appeler l'hôte",
    available: 'Dispo 24/7',
    secureCode: 'Code Boîte à Clés',
    hideCode: 'Masquer le code',
    revealCode: 'Toucher pour voir',
    tangierFavs: 'Favoris de Tanger',
    viewMap: 'Voir sur la carte',
    poweredBy: 'Propulsé par',
    feedbackTitle: 'Notez le séjour',
    rating: 'Comment était le séjour ?',
    comment: 'Un commentaire ?',
    sendReview: "Envoyer l'avis (WhatsApp)",
    reviewOnAirbnb: 'Laisser un avis sur Airbnb ⭐️',
    badReviewNote: 'Laissez-nous régler ça sur WhatsApp !',
    goodReviewNote: 'Votre avis 5 étoiles nous aide beaucoup !',
    aboutPlace: 'À propos de ce lieu',
    walk: 'Marche',
    ratings: 'Avis',
    seeDetails: 'Voir Détails',
    whatsappHost: 'WhatsApp Hôte', // <--- ZID HADI
    chatNow: 'Discuter',           // <--- ZID HADI
  },
  es: {
    welcome: 'Bienvenido,',
    enjoy: 'Disfruta de tu estancia en Tánger.',
    hostedBy: 'Anfitrión',
    online: 'En línea',
    wifiTitle: 'Acceso WiFi',
    network: 'Red',
    password: 'Clave',
    copy: 'Copiar contraseña',
    copied: '¡Copiado!',
    checkinTitle: 'Llegada',
    houseGuideTitle: 'Guía Casa',
    localGemsTitle: 'Lugares Top',
    helpTitle: 'Ayuda',
    emergencyTitle: 'Emergencia',
    police: 'Policía',
    ambulance: 'Ambulancia',
    manager: 'Gerente',
    callHost: 'Llamar anfitrión',
    available: 'Disponible 24/7',
    secureCode: 'Código Caja Fuerte',
    hideCode: 'Ocultar código',
    revealCode: 'Tocar para ver',
    tangierFavs: 'Favoritos de Tánger',
    viewMap: 'Ver en el mapa',
    poweredBy: 'Creado por',
    feedbackTitle: 'Valora tu estancia',
    rating: '¿Qué tal tu estancia?',
    comment: '¿Algún comentario?',
    sendReview: 'Enviar opinión (WhatsApp)',
    reviewOnAirbnb: 'Escribir reseña en Airbnb ⭐️',
    badReviewNote: '¡Déjanos arreglarlo en WhatsApp!',
    goodReviewNote: '¡Tu reseña de 5 estrellas nos ayuda!',
    aboutPlace: 'Sobre este lugar',
    walk: 'Caminando',
    ratings: 'Reseñas',
    seeDetails: 'Ver Detalles',
    whatsappHost: 'WhatsApp Anfitrión', // <--- ZID HADI
    chatNow: 'Chatear ahora',           // <--- ZID HADI
  },
};

export type Language = 'en' | 'fr' | 'es';
export type TranslationKeys = typeof translations.en;

// --- ICONS ---
export const Icons = {
  Wifi: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Book: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Key: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="3" />
      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
    </svg>
  ),
  Map: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Phone: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Copy: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Check: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Eye: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Unlock: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ExternalLink: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Star: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Close: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  ChevronRight: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

// --- 1. DATA ---
const guideData: GuideData = {
  hostName: 'Nizar Apartments',
  hostAvatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  guestName: 'Guest',
  airbnbLink: 'https://www.airbnb.com/rooms/YOUR_ROOM_ID',

  wifi: {
    network: 'Malabata_Guest_5G',
    password: 'Tanger2026(Free)',
  },

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

  emergency: {
    police: '19',
    ambulance: '15',
    hostPhone: '+212 661 000 000',
  },

  recommendations: [
    {
      id: 1,
      title: 'Cafe Hafa',
      category: 'Must Visit',
      desc: 'Legendary tiered cafe with mint tea and views of Spain.',
      image:
        'https://images.unsplash.com/photo-1564507204940-5e60e807186a?auto=format&fit=crop&q=80&w=400',
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 2,
      title: 'Restaurant Bachir',
      category: 'Food',
      desc: "Famous local spot for 'Poulet Citron'. Authentic & affordable.",
      image:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 3,
      title: 'Hercules Caves',
      category: 'Sightseeing',
      desc: 'Where the Atlantic meets the Mediterranean. 20min drive.',
      image:
        'https://images.unsplash.com/photo-1574620608560-63973cb439e6?auto=format&fit=crop&q=80&w=400',
      mapLink: 'https://goo.gl/maps/xyz',
    },
    {
      id: 4,
      title: 'Marina Bay',
      category: 'Nightlife',
      desc: 'Evening walk, dinner, or clubbing. Safe modern area.',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
      mapLink: 'https://goo.gl/maps/xyz',
    },
  ],
};
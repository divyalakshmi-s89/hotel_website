// LOCAL images = your uploaded photos (served from /public/images/)
// UNSPLASH images = free photos loaded by browser at runtime

const LOCAL = '/images/menu/';

export const MENU = {
  breakfast: {
    label: 'Breakfast',
    time:  '7 AM – 11 AM',
    emoji: '🌅',
    items: [
      {
        name:  'Idli',
        price: 10,
        img:   'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
        desc:  'Soft steamed rice cakes served with sambar & coconut chutney',
      },
      {
        name:  'Vada',
        price: 10,
        img:   'https://images.unsplash.com/photo-1728508707623-56d3dca51187?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        desc:  'Crispy golden lentil donuts with coconut chutney & sambar',
      },
      {
        name:  'Poori',
        price: 15,
        img:   LOCAL + 'poori.png',
        desc:  'Fluffy deep-fried bread with spicy potato masala',
      },
    ],
  },

  lunch: {
    label: 'Lunch',
    time:  '12 PM – 4 PM',
    emoji: '☀️',
    items: [
      {
        name:  'Meals',
        price: 90,
        img:   LOCAL + 'meals.png',
        desc:  'Full South Indian thali – rice, sambar, rasam, curries & more',
      },
      {
        name:  'Tomato Rice',
        price: 30,
        img:   LOCAL + 'tomato-rice.png',
        desc:  'Tangy spiced rice cooked with fresh tomatoes & aromatic spices',
      },
      {
        name:  'Lemon Rice',
        price: 30,
        img:   LOCAL + 'lemon-rice.png',
        desc:  'Aromatic rice with fresh lemon juice, roasted peanuts & curry leaves',
      },
      {
        name:  'Curd Rice',
        price: 30,
        img:   LOCAL + 'curd-rice.png',
        desc:  'Cooling yogurt rice tempered with mustard seeds & curry leaves',
      },
    ],
  },

  dinner: {
    label: 'Dinner',
    time:  '6 PM – 10 PM',
    emoji: '🌙',
    items: [
      {
        name:  'Parotta',
        price: 13,
        img:   LOCAL + 'parotta.png',
        desc:  'Flaky layered Kerala-style parotta, best served with salna',
      },
      {
        name:  'Special Dosa',
        price: 35,
        img:   LOCAL + 'special-dosa.png',
        desc:  'Crispy dosa with special masala potato filling',
      },
      {
        name:  'Normal Dosa',
        price: 15,
        img:   LOCAL + 'normal-dosa.png',
        desc:  'Classic thin & crispy golden dosa with chutney',
      },
      {
        name:  'Idli',
        price: 10,
        img:   'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80',
        desc:  'Soft steamed rice cakes with chutney',
      },
      {
        name:  'Kothu Parotta',
        price: 80,
        img:   LOCAL + 'kothu-parotta.png',
        desc:  'Shredded parotta tossed with eggs, onions & spicy masala',
      },
      {
        name:  'Egg Omelette',
        price: 20,
        img:   LOCAL + 'omlette.png',
        desc:  'Fluffy egg omelette spiced with onion & green chilli',
      },
      {
        name:  'Half Boil',
        price: 20,
        img:   LOCAL + 'half-boil.png',
        desc:  'Perfectly half-boiled eggs with pepper & salt',
      },
      {
        name:  'Egg Poriyal',
        price: 20,
        img:   LOCAL + 'egg-poriyal.png',
        desc:  'Dry spiced egg stir-fry Tamil style',
      },
      {
        name:  'Kalakki',
        price: 20,
        img:   LOCAL + 'kalakki.png',
        desc:  'Soft creamy scrambled eggs Tamil style',
      },
      {
        name:  'Special Egg Dosa',
        price: 50,
        img:   LOCAL + 'egg-dosa.png',
        desc:  'Crispy dosa with egg & special masala filling',
      },
      {
        name:  'Normal Egg Dosa',
        price: 40,
        img:   LOCAL + 'normalegg-dosa.png',
        desc:  'Golden dosa folded with egg preparation',
      },
      {
        name:  'Onion Dosa',
        price: 40,
        img:   LOCAL + 'onion-dosa.png',
        desc:  'Crispy dosa topped with caramelized onions',
      },
      {
        name:  'Veechu Parotta',
        price: 20,
        img:   LOCAL + 'veechu-parotta.png',
        desc:  'Thin crispy tossed parotta finished with ghee',
      },
      {
        name:  'Egg Veechu Parotta',
        price: 30,
        img:   LOCAL + 'eggveechu-parotta.png',
        desc:  'Veechu parotta mixed with egg',
      },
      {
        name:  'Sandwich Parotta',
        price: 80,
        img:   LOCAL + 'egglappa.png',
        desc:  'Layered parotta stuffed with spiced filling',
      },
    ],
  },
};
const LOCAL1 = '/images/snacks/';

// Snacks – Unsplash free photos (browser loads at runtime)
export const SNACKS = [
  { name: 'Sev',               img: LOCAL1 + 'sev.jpg'},
  { name: 'Ribbon Pakoda',     img: LOCAL1 + 'ribbon.jpg'},
  { name: 'Katta Sev',         img: LOCAL1 + 'katta.jpg'},
  { name: 'Jalebi',            img: LOCAL1 + 'jelebi.jpg'},
  { name: 'Halwa',             img: LOCAL1 + 'halwa.jpg'},
  { name: 'Murukku',           img: LOCAL1 + 'muruku.jpg'},
  { name: 'Mixture',           img: LOCAL1 + 'mixture.jpg'},
  { name: 'Masala Kadalai',    img: LOCAL1 + 'masalkadalai.jpg'},
  { name: 'Kara Boondi',       img: LOCAL1 + 'karaboonthi.jpg'},
  { name: 'Pakoda',            img: LOCAL1 + 'pakoda.jpg'},
  { name: 'Ribbon Sev',        img: LOCAL1 + 'ribbonsev.jpg'},
  { name: 'Chicken Sev',       img: LOCAL1 + 'redsev.jpg'},
  { name: 'Seeni Sev',         img: LOCAL1 + 'seenisev.jpg'},
  { name: 'Murukku Sev',       img: LOCAL1 + 'murukusev.jpg' },
  { name: 'Omapodi',           img: LOCAL1 + 'omapodi.jpg'},
  { name: 'Corn Flakes Mixture', img: LOCAL1 + 'corn.jpg'},
];

export const REVIEWS = [
  ];

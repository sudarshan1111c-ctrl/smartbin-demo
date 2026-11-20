// smartbin/js/config.js

// Points awarded per waste category (demo values)
window.SMARTBIN_POINTS = {
  wet: 5,
  dry: 5,
  plastic: 10,
  paper: 5,
  'e-waste': 15
};

// Sample rewards catalog (demo)
window.SMARTBIN_REWARDS = [
  { id: 1, name: 'Tea', points: 80, img: 'https://via.placeholder.com/120?text=Tea' },
  { id: 2, name: 'Snack', points: 150, img: 'https://via.placeholder.com/120?text=Snack' },
  { id: 3, name: 'Juice', points: 200, img: 'https://via.placeholder.com/120?text=Juice' },
  { id: 4, name: 'Coffee', points: 120, img: 'https://via.placeholder.com/120?text=Coffee' },
  { id: 5, name: 'Canteen Coupon', points: 300, img: 'https://via.placeholder.com/120?text=Coupon' }
];

// Sample leaderboard data (demo)
window.SMARTBIN_LEADERBOARD = {
  weekly: [
    { name: 'Alice Johnson', dept: 'CS', points: 420 },
    { name: 'Bob Patel', dept: 'EE', points: 380 },
    { name: 'Carol Singh', dept: 'ME', points: 340 },
    { name: 'David Lee', dept: 'CE', points: 310 },
    { name: 'Eva Zhou', dept: 'IT', points: 295 },
    { name: 'Frank Wu', dept: 'CS', points: 280 },
    { name: 'Grace Kim', dept: 'EE', points: 260 },
    { name: 'Hiro Tanaka', dept: 'ME', points: 250 },
    { name: 'Irene Patel', dept: 'CE', points: 240 },
    { name: 'Jack Ma', dept: 'IT', points: 230 }
  ],
  monthly: [
    { name: 'Alice Johnson', dept: 'CS', points: 1800 },
    { name: 'Bob Patel', dept: 'EE', points: 1650 },
    { name: 'Carol Singh', dept: 'ME', points: 1500 },
    // ... more entries omitted for brevity
  ]
};

// Impact demo data
window.SMARTBIN_IMPACT = {
  totalWasteKg: 1850,
  plasticKg: 420,
  paperKg: 310,
  activeStudents: 250,
  pointsDistributed: 12450
};

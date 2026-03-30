// src/data/mockVehicles.js

export const MOCK_VEHICLES = [
  {
    id: 1,
    title: 'Toyota Corolla (2025)',
    rating: '4.5',
    reviewsCount: 120,
    category: 'SEDAN • AUTOMATIC • PETROL',
    features: ['AC', 'Bluetooth', '4 Passengers'],
    price: 5000,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    overview: 'The Toyota Corolla is a compact car that offers a comfortable ride, good fuel economy, and a long list of standard safety features. Perfect for city driving and long highway trips alike. Experience the reliability and smoothness that has made Corolla a legend on the road.',
    specifications: [
      { id: 'fuel', icon: 'M8 2h8m-4 0v2m-4 8h8M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', label: 'Petrol' },
      { id: 'transmission', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\nM12 8v4l3 3', label: 'Automatic' },
      { id: 'seats', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\nM23 21v-2a4 4 0 0 0-3-3.87\nM16 3.13a4 4 0 0 1 0 7.75', label: '5 Seats' },
      { id: 'mileage', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: '15km/L' }
    ],
    reviews: [
      { id: 1, user: 'Utsav', avatarInitial: 'U', avatarBg: '#1a73e8', date: '2 days ago', rating: 5, text: 'Car was in excellent condition. Smooth pickup process.' },
      { id: 2, user: 'Bhargav', avatarInitial: 'B', avatarBg: '#1e293b', date: '1 week ago', rating: 4, text: 'Great car, but the GPS was a bit outdated. Otherwise everything was perfect!' }
    ]
  },
  {
    id: 2,
    title: 'Honda Civic',
    rating: '4.8',
    reviewsCount: 85,
    category: 'SEDAN • AUTOMATIC • PETROL',
    features: ['AC', 'GPS', '5 Passengers'],
    price: 6500,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    overview: 'The Honda Civic combines a sporty design with robust performance. It is known for its responsive handling and comfortable, well-designed interior. Ideal for those who enjoy a dynamic driving experience.',
    specifications: [
      { id: 'fuel', icon: 'M8 2h8m-4 0v2m-4 8h8M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', label: 'Petrol' },
      { id: 'transmission', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\nM12 8v4l3 3', label: 'Automatic' },
      { id: 'seats', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\nM23 21v-2a4 4 0 0 0-3-3.87\nM16 3.13a4 4 0 0 1 0 7.75', label: '5 Seats' },
      { id: 'mileage', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: '14km/L' }
    ],
    reviews: [
      { id: 1, user: 'Aisha', avatarInitial: 'A', avatarBg: '#ec4899', date: '3 weeks ago', rating: 5, text: 'Fantastic ride! Very clean and comfortable.' }
    ]
  },
  {
    id: 3,
    title: 'Nissan X-Trail',
    rating: '4.7',
    reviewsCount: 92,
    category: 'SUV • AUTOMATIC • DIESEL',
    features: ['AC', 'Off-road', '5 Passengers'],
    price: 8000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
    overview: 'The Nissan X-Trail is a versatile and family-friendly SUV with excellent off-road capabilities and a spacious cabin. Perfect for adventure trips or large family outings.',
    specifications: [
      { id: 'fuel', icon: 'M8 2h8m-4 0v2m-4 8h8M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', label: 'Diesel' },
      { id: 'transmission', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\nM12 8v4l3 3', label: 'Automatic' },
      { id: 'seats', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\nM23 21v-2a4 4 0 0 0-3-3.87\nM16 3.13a4 4 0 0 1 0 7.75', label: '5 Seats' },
      { id: 'mileage', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: '18km/L' }
    ],
    reviews: [
      { id: 1, user: 'Rahul', avatarInitial: 'R', avatarBg: '#f59e0b', date: '1 month ago', rating: 5, text: 'Great clearance and power. Handled rough terrains perfectly.' },
      { id: 2, user: 'Sunita', avatarInitial: 'S', avatarBg: '#10b981', date: '1 month ago', rating: 4, text: 'Spacious and comfortable.' }
    ]
  }
];

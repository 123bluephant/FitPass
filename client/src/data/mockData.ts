import { Gym, Product } from '../types';

export const gymCategories = ['Basic', 'Premium', 'Elite'];

export const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'FitZone Gym',
    description: 'A modern gym with all the latest equipment for your fitness needs.',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Fitness Ave, San Francisco, CA'
    },
    price: 50,
    rating: 4.5,
    amenities: ['Cardio Equipment', 'Weight Training', 'Locker Rooms', 'Showers'],
    categories: ['Basic', 'Premium'],
    slots: [
      {
        id: '101',
        gymId: '1',
        date: '2025-06-01',
        startTime: '07:00',
        endTime: '08:30',
        capacity: 20,
        booked: 8
      },
      {
        id: '102',
        gymId: '1',
        date: '2025-06-01',
        startTime: '09:00',
        endTime: '10:30',
        capacity: 20,
        booked: 15
      }
    ]
  },
  {
    id: '2',
    name: 'PowerHouse Fitness',
    description: 'Specializing in strength training with professional trainers.',
    image: 'https://images.pexels.com/photos/13106590/pexels-photo-13106590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: '456 Muscle St, San Francisco, CA'
    },
    price: 75,
    rating: 4.8,
    amenities: ['Weight Training', 'Personal Trainers', 'Sauna', 'Juice Bar'],
    categories: ['Premium', 'Elite'],
    slots: [
      {
        id: '201',
        gymId: '2',
        date: '2025-06-01',
        startTime: '08:00',
        endTime: '09:30',
        capacity: 15,
        booked: 10
      },
      {
        id: '202',
        gymId: '2',
        date: '2025-06-01',
        startTime: '10:00',
        endTime: '11:30',
        capacity: 15,
        booked: 5
      }
    ]
  },
  {
    id: '3',
    name: 'Yoga Bliss Studio',
    description: 'Find your inner peace with our expert yoga instructors.',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: {
      lat: 37.7750,
      lng: -122.4183,
      address: '789 Zen Blvd, San Francisco, CA'
    },
    price: 60,
    rating: 4.6,
    amenities: ['Yoga Studios', 'Meditation Rooms', 'Locker Rooms', 'Tea Bar'],
    categories: ['Basic', 'Premium', 'Elite'],
    slots: [
      {
        id: '301',
        gymId: '3',
        date: '2025-06-01',
        startTime: '07:00',
        endTime: '08:00',
        capacity: 25,
        booked: 20
      },
      {
        id: '302',
        gymId: '3',
        date: '2025-06-01',
        startTime: '18:00',
        endTime: '19:00',
        capacity: 25,
        booked: 12
      }
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Protein Shake',
    description: 'High-quality protein shake for muscle recovery.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/8026227/pexels-photo-8026227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Supplements',
    gymId: '1',
    inStock: true
  },
  {
    id: '2',
    name: 'Fitness Gloves',
    description: 'Durable gym gloves for weight training.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '3',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for all your yoga needs.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/5767279/pexels-photo-5767279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Equipment',
    gymId: '3',
    inStock: true
  },
  {
    id: '4',
    name: 'Energy Drink',
    description: 'Pre-workout energy drink to boost your performance.',
    price: 3.99,
    image: 'https://images.pexels.com/photos/4134791/pexels-photo-4134791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Beverages',
    inStock: true
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    description: 'Track your fitness metrics with this sleek fitness band.',
    price: 99.99,
    image: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Electronics',
    inStock: true
  },
  {
    id: '6',
    name: 'Gym Towel Set',
    description: 'Set of 3 gym towels, perfect for your workout sessions.',
    price: 19.99,
    image: 'https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    gymId: '2',
    inStock: true
  }
];
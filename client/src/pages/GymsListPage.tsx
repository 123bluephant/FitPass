import React, { useState, useEffect } from 'react';
import GymCard from '../components/gym/GymCard';
import GymFilter, { FilterOptions } from '../components/gym/GymFilter';
import { mockGyms } from '../data/mockData';
import { Gym } from '../types';

const GymsListPage: React.FC = () => {
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    amenities: [],
    priceRange: [0, 200],
    sortBy: 'distance'
  });

  useEffect(() => {
    let filteredGyms = [...mockGyms];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredGyms = filteredGyms.filter(
        gym => 
          gym.name.toLowerCase().includes(searchLower) || 
          gym.location.address.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.amenities.length > 0) {
      filteredGyms = filteredGyms.filter(gym => 
        filters.amenities.every(amenity => gym.amenities.includes(amenity))
      );
    }
    
    filteredGyms = filteredGyms.filter(
      gym => gym.price >= filters.priceRange[0] && gym.price <= filters.priceRange[1]
    );
    
    if (filters.category) {
      filteredGyms = filteredGyms.filter(gym => 
        gym.categories.includes(filters.category!)
      );
    }
    
    filteredGyms.sort((a, b) => {
      if (filters.sortBy === 'price') {
        return a.price - b.price;
      } else if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
    
    setGyms(filteredGyms);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Gym</h1>
          <p className="mt-2 text-gray-600">
            Discover and access gyms that match your fitness goals
          </p>
        </div>

        <GymFilter onFilterChange={setFilters} />

        {gyms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No gyms found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gyms.map(gym => (
              <GymCard 
                key={gym.id} 
                gym={gym}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GymsListPage;
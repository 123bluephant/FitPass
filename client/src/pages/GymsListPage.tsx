import React, { useState, useEffect } from 'react';
import GymCard from '../components/gym/GymCard';
import { mockGyms } from '../data/mockData';
import { Gym } from '../types';
import Slider from '../components/ui/slider';
import  Checkbox  from '../components/ui/checkbox';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

type FilterOptions = {
  search: string;
  amenities: string[];
  priceRange: [number, number];
  category: string;
  sortBy: string;
};

const GymsListPage: React.FC = () => {
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    amenities: [],
    priceRange: [0, 200],
    category: 'all',
    sortBy: 'distance'
  });

  const categories = ['all', ...new Set(mockGyms.flatMap(gym => gym.categories))];
  const amenities = [...new Set(mockGyms.flatMap(gym => gym.amenities))];

  useEffect(() => {
    let filteredGyms = [...mockGyms];
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredGyms = filteredGyms.filter(
        gym => 
          gym.name.toLowerCase().includes(searchLower) || 
          gym.location.address.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filteredGyms = filteredGyms.filter(gym => 
        gym.categories.includes(filters.category)
      );
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filteredGyms = filteredGyms.filter(gym => 
        filters.amenities.every(amenity => gym.amenities.includes(amenity))
      );
    }

    // Price range filter
    filteredGyms = filteredGyms.filter(
      gym => gym.price >= filters.priceRange[0] && gym.price <= filters.priceRange[1]
    );

    // Sorting
    filteredGyms.sort((a, b) => {
      if (filters.sortBy === 'price') return a.price - b.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 p-6 h-fit">
            <div className="space-y-6">
              {/* Search Filter */}
              <div>
                <Input
                  placeholder="Search gyms..."
                  value={filters.search}
                  onChange={e => setFilters({...filters, search: e.target.value})}
                />
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium mb-4">Price Range</h3>
                <Slider
                  min={0}
                  max={200}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value: [number, number]) => 
                    setFilters({...filters, priceRange: value as [number, number]})
                  }
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={filters.category === category ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setFilters({...filters, category})}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Amenities</h3>
                <div className="space-y-2">
                  {amenities.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={(checked: any) => {
                          const updated = checked
                            ? [...filters.amenities, amenity]
                            : filters.amenities.filter(a => a !== amenity);
                          setFilters({...filters, amenities: updated});
                        }}
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div>
                <h3 className="text-sm font-medium mb-3">Sort By</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sortBy === 'distance'}
                      onChange={() => setFilters({...filters, sortBy: 'distance'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-sm">Distance</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sortBy === 'price'}
                      onChange={() => setFilters({...filters, sortBy: 'price'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-sm">Price</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters.sortBy === 'rating'}
                      onChange={() => setFilters({...filters, sortBy: 'rating'})}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-sm">Rating</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Gym List */}
          <div className="lg:col-span-3">
            {gyms.length === 0 ? (
              <Card className="p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No gyms found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gyms.map(gym => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymsListPage;
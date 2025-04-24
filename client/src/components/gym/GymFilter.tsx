import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface GymFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  search: string;
  amenities: string[];
  priceRange: [number, number];
  category?: string;
  sortBy: 'price' | 'rating' | 'distance';
}

const GymFilter: React.FC<GymFilterProps> = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('distance');

  const amenitiesList = [
    'Cardio Equipment',
    'Weight Training',
    'Personal Trainers',
    'Yoga Studios',
    'Swimming Pool',
    'Sauna',
    'Locker Rooms',
    'Showers',
    'Juice Bar',
  ];

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    onFilterChange({
      search,
      amenities: selectedAmenities,
      priceRange,
      sortBy,
    });
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setPriceRange([0, 200]);
    setSortBy('distance');
    onFilterChange({
      search: '',
      amenities: [],
      priceRange: [0, 200],
      sortBy: 'distance',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <form onSubmit={handleSearch} className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search gyms by name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={18} />}
              fullWidth
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              leftIcon={<Filter size={18} />}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Filters
            </Button>
            <Button type="submit">Search</Button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Amenities */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
                <div className="space-y-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$50</span>
                    <span>$100</span>
                    <span>$150</span>
                    <span>$200+</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: 'distance', label: 'Distance' },
                    { value: 'price', label: 'Price: Low to High' },
                    { value: 'rating', label: 'Rating: High to Low' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sortBy"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={() => setSortBy(option.value as any)}
                        className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button type="button" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GymFilter;
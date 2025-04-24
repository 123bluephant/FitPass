import React, { useState } from 'react';

export interface FilterOptions {
  search: string;
  amenities: string[];
  priceRange: [number, number];
  sortBy: string;
  category?: string;
}

interface GymFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const GymFilter: React.FC<GymFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    amenities: [],
    priceRange: [0, 200],
    sortBy: 'distance',
    category: '',
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, search: event.target.value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Search updates immediately
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedPriceRange = [...filters.priceRange] as [number, number];
    updatedPriceRange[index] = parseInt(event.target.value, 10);
    setFilters({ ...filters, priceRange: updatedPriceRange });
  };

  const applyPriceRange = () => {
    onFilterChange(filters); // Apply price range changes when button is clicked
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sortBy: event.target.value });
  };

  const applySort = () => {
    onFilterChange(filters); // Apply sort changes when button is clicked
  };

  return (
    <div className="filter-container bg-white p-4 rounded-lg shadow-lg">
      {/* Single Search Bar */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700 font-medium">
          Search Gym
        </label>
        <input
          id="search"
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by name or location..."
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label htmlFor="priceRange" className="block text-gray-700 font-medium">
          Price Range
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceRangeChange(e, 0)}
            className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(e, 1)}
            className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Max"
          />
        </div>
        <button
          onClick={applyPriceRange}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Price Range
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="block text-gray-700 font-medium">
          Sort By
        </label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="distance">Distance</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <button
          onClick={applySort}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Sort
        </button>
      </div>
    </div>
  );
};

export default GymFilter;

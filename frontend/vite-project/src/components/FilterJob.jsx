import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

const FilterJob = ({ onFilterChange, selectedFilters, onClearFilters }) => {
  const filterData = [
    {
      filterType: 'location',
      array: ['Mumbai', 'Delhi', 'Chennai', 'Bangalore'],
    },
    {
      filterType: 'jobType',
      array: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    },
    {
      filterType: 'salary',
      array: ['2-50k', '50-100k', '150-200k', '200-250k'],
    },
    {
      filterType: 'experienceLevel',
      array: ['0-2', '2-5', '5-10', '10+'],
    },
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="w-full p-6 rounded-2xl shadow-lg bg-white sticky top-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="text-orange-500 border-orange-500 hover:bg-orange-50"
        >
          Clear Filters
        </Button>
      </div>

      {filterData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h2 className="text-md font-medium capitalize text-gray-700 mb-3">
            {section.filterType}
          </h2>
          <RadioGroup
            value={selectedFilters[section.filterType] || ''}
            onValueChange={(value) => handleFilterChange(section.filterType, value)}
          >
            {section.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={item}
                  id={`${section.filterType}-${item}`}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <Label
                  htmlFor={`${section.filterType}-${item}`}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {item} {section.filterType === 'experienceLevel' ? 'years' : ''}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterJob;
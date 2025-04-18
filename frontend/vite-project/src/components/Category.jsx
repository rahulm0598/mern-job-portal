import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const categories = [
    'Flutter Developer',
    'React Developer',
    'Next.js Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Node.js Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Software Engineer',
  ];

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="py-12 w-full mx-auto flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
              key={index}
            >
              <Button
                className="w-full bg-orange-500 text-white rounded-full py-3 px-6 font-medium shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors" />
        <CarouselNext className="bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors" />
      </Carousel>
    </div>
  );
};

export default Category;
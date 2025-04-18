import { Badge } from "@/components/ui/badge"
import React from 'react'

function JobCard() {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
          Company
        </h1>
        <Badge className="bg-blue-500 text-white cursor-pointer rounded-full py-1 px-3">
          Mumbai
        </Badge>
      </div>
      
      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Title</h2>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam mollitia obcaecati impedit, tempora velit veniam laudantium.
        </p>
      </div>
      
      {/* Job Info - Position, Type, Salary */}
      <div className="flex gap-3 items-center justify-between">
        <Badge className="bg-orange-500 text-white cursor-pointer rounded-full py-1 px-4">
          Position
        </Badge>
        <Badge className="bg-blue-500 text-white cursor-pointer rounded-full py-1 px-4">
          Fulltime
        </Badge>
        <Badge className="bg-pink-500 text-white cursor-pointer rounded-full py-1 px-4">
          15 Lpa
        </Badge>
      </div>

      {/* Button Section */}
      <div className="flex gap-4 mt-5">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          View Details
        </button>
        <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          Save for Later
        </button>
      </div>
    </div>
  )
}

export default JobCard
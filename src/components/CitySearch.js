import React, { useState, useRef, useEffect } from "react";

const CitySearch = ({ onCitySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    // In a real application, you would fetch cities from an API here
    // For this example, we'll use a mock list
    const mockCities = [
      "New York",
      "London",
      "Paris",
      "Tokyo",
      "Sydney",
      "Berlin",
      "Rome",
      "Madrid",
      "Moscow",
      "Beijing",
    ].filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()));

    setCities(mockCities);
    setIsOpen(true);
  };

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex">
        <input
          type="text"
          placeholder="Search for a city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
        >
          Search
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {cities.map((city, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;

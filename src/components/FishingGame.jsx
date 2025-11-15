import React, { useState, useEffect } from 'react';
import { Boat, Fish, Scallop, Crab, Lobster } from './GameAssets';
import api from '../services/api';

export default function FishingGame() {
  const [location, setLocation] = useState('');
  const [catches, setCatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFish = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/fishing-spots/${location}`);
        setCatches(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (location) {
      fetchFish();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Fishing Game</h1>

        <div className="mb-8">
          <label htmlFor="location" className="block mb-2 font-medium">
            Select a Location
          </label>
          <select
            id="location"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">Choose a location</option>
            <option value="coastal">Coastal Waters</option>
            <option value="offshore">Offshore</option>
            <option value="deep-sea">Deep Sea</option>
          </select>
        </div>

        {isLoading && <div className="text-center">Loading...</div>}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-md p-4 mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {catches.map((catch, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 flex flex-col items-center"
            >
              {catch.type === 'fish' && <Fish />}
              {catch.type === 'scallop' && <Scallop />}
              {catch.type === 'crab' && <Crab />}
              {catch.type === 'lobster' && <Lobster />}
              <h3 className="text-xl font-bold mt-4">{catch.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {catch.weight} lbs
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Boat className="mx-auto mb-4" />
          <p>Your Fishing Boat</p>
        </div>
      </div>
    </div>
  );
}

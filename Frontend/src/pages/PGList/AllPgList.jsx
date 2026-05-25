// src/pages/pg/ExplorePg.jsx

import { useEffect, useState } from "react";
import api from "../../api/axios";

// ─────────────────────────────────────────────────────────────
// Reusable PG Card
// ─────────────────────────────────────────────────────────────
import { PgCard } from "./PgCard";

// ─────────────────────────────────────────────────────────────
// Main Explore Page
// ─────────────────────────────────────────────────────────────
const ExplorePg = () => {

  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [filters, setFilters] = useState({
    city: "",
    genderPreference: "",
    roomType: "",
    minRent: "",
    maxRent: "",
  });

  // ───────────────────────────────────────────────────────────
  // Fetch PGs
  // ───────────────────────────────────────────────────────────
  const fetchPgs = async () => {

  try {

    setLoading(true);

    const query = new URLSearchParams();

    Object.keys(filters).forEach((key) => {

      if (filters[key]) {
        query.append(key, filters[key]);
      }
    });

    const url = query.toString()
      ? `/listings?${query.toString()}`
      : "/listings";

    const response = await api.get(url);

    console.log(response.data);

    setPgs(response.data.listings || []);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};
useEffect(() => {
  fetchPgs();
}, []);
  // ───────────────────────────────────────────────────────────
  // Handle filter change
  // ───────────────────────────────────────────────────────────
  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ───────────────────────────────────────────────────────────
  // Apply Filters
  // ───────────────────────────────────────────────────────────
  const applyFilters = () => {
    fetchPgs();
  };

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#131318] sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <h1 className="text-3xl font-bold">
            Explore PGs
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Find the best PG according to your preferences
          </p>

        </div>

      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Filters */}
        <div className="bg-[#131318] border border-white/10 rounded-3xl p-6 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleChange}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3 outline-none"
            />

            {/* Gender */}
            <select
              name="genderPreference"
              value={filters.genderPreference}
              onChange={handleChange}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3"
            >
              <option value="">
                Gender
              </option>

              <option value="boys">
                Boys
              </option>

              <option value="girls">
                Girls
              </option>

              <option value="any">
                Any
              </option>

            </select>

            {/* Room Type */}
            <select
              name="roomType"
              value={filters.roomType}
              onChange={handleChange}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3"
            >
              <option value="">
                Room Type
              </option>

              <option value="single">
                Single
              </option>

              <option value="double">
                Double
              </option>

              <option value="triple">
                Triple
              </option>

            </select>

            {/* Min Rent */}
            <input
              type="number"
              name="minRent"
              placeholder="Min Rent"
              value={filters.minRent}
              onChange={handleChange}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3 outline-none"
            />

            {/* Max Rent */}
            <input
              type="number"
              name="maxRent"
              placeholder="Max Rent"
              value={filters.maxRent}
              onChange={handleChange}
              className="bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3 outline-none"
            />

          </div>

          {/* Button */}
          <button
            onClick={applyFilters}
            className="mt-5 bg-[#7c6ff7] hover:opacity-90 transition-all px-8 py-3 rounded-2xl font-medium"
          >
            Apply Filters
          </button>

        </div>

        {/* Loading */}
        {
          loading && (
            <div className="text-center py-20 text-gray-400">
              Loading PGs...
            </div>
          )
        }

        {/* No PGs */}
        {
          !loading && pgs.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No PGs Found
            </div>
          )
        }

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {
            pgs.map((pg) => (
              <PgCard
                key={pg._id}
                pg={pg}
              />
            ))
          }

        </div>

      </div>

    </div>
  );
};

export default ExplorePg;
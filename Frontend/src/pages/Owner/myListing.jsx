// src/pages/pg/MyListings.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const MyListings = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // Fetch Owner Listings
  // ─────────────────────────────────────────────
  const fetchListings = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/listings/owner/my-listings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setListings(response.data.listings || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Delete Listing
  // ─────────────────────────────────────────────
  const handleDelete = async (id) => {

    try {

      const confirmDelete = window.confirm(
        "Delete this listing?"
      );

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      await api.delete(
        `/listings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setListings((prev) =>
        prev.filter((listing) => listing._id !== id)
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // ─────────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────────
  if (loading) {

    return (

      <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center text-white">
        Loading listings...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#131318]">

        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              My Listings
            </h1>

            <p className="text-gray-400 mt-1">
              Manage all your PG listings
            </p>

          </div>

          <button
            onClick={() => navigate("/createpg")}
            className="bg-[#7c6ff7] hover:opacity-90 px-6 py-3 rounded-2xl font-medium"
          >
            + Add New PG
          </button>

        </div>

      </div>

      {/* Empty */}
      {
        listings.length === 0 && (

          <div className="flex flex-col items-center justify-center py-32">

            <h2 className="text-2xl font-semibold">
              No Listings Yet
            </h2>

            <p className="text-gray-400 mt-3">
              Create your first PG listing
            </p>

          </div>
        )
      }

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
          listings.map((listing) => (

            <div
              key={listing._id}
              className="bg-[#131318] border border-white/10 rounded-3xl overflow-hidden hover:border-[#7c6ff7]/40 transition-all"
            >

              {/* Image */}
              <div className="relative h-56">

                <img
                  src={
                    listing?.photos?.[0]?.url ||
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                  }
                  alt="pg"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-[#7c6ff7] text-white text-xs px-3 py-1 rounded-full">
                  {listing?.genderPreference}
                </div>

              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-xl font-semibold">
                      {listing?.title}
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      {listing?.city}, {listing?.state}
                    </p>

                  </div>

                  <div className="text-right">

                    <h3 className="text-2xl font-bold text-[#7c6ff7]">
                      ₹{listing?.rent}
                    </h3>

                    <p className="text-xs text-gray-400">
                      / month
                    </p>

                  </div>

                </div>

                {/* Details */}
                <div className="flex gap-3 flex-wrap mt-5">

                  <div className="bg-[#1d1d25] px-3 py-2 rounded-xl text-sm">
                    {listing?.roomType}
                  </div>

                  <div className="bg-[#1d1d25] px-3 py-2 rounded-xl text-sm">
                    {listing?.availableRooms} rooms
                  </div>

                </div>

                {/* Buttons */}
                <div className="grid grid-cols-3 gap-3 mt-6">

                  <button
                    onClick={() =>
                      navigate(`/listings/${listing._id}`)
                    }
                    className="bg-[#1d1d25] hover:bg-[#2a2a35] py-3 rounded-2xl text-sm"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/listings/edit/${listing._id}`)
                    }
                    className="bg-[#7c6ff7] hover:opacity-90 py-3 rounded-2xl text-sm"
                  >
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(listing._id)
                    }
                    className="border border-red-500 text-red-400 hover:bg-red-500/10 py-3 rounded-2xl text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyListings;
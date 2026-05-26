// src/pages/pg/SavedPg.jsx

import { useEffect, useState } from "react";
import api from "../../api/axios";
import { PgCard } from "./PgCard";

const SavedPg = () => {

  const [savedPgs, setSavedPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // Fetch Saved PGs
  // ─────────────────────────────────────────────
  const fetchSavedPgs = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/listings/saved-listings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setSavedPgs(response.data.listings || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPgs();
  }, []);

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#131318] sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <h1 className="text-3xl font-bold">
            Saved PGs
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Your bookmarked PG listings
          </p>

        </div>

      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Loading */}
        {
          loading && (
            <div className="text-center py-24 text-gray-400">
              Loading saved PGs...
            </div>
          )
        }

        {/* Empty */}
        {
          !loading && savedPgs.length === 0 && (
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-12 text-center">

              <h2 className="text-2xl font-semibold">
                No Saved PGs
              </h2>

              <p className="text-gray-400 mt-3">
                Start exploring and save your favorite PGs.
              </p>

            </div>
          )
        }

        {/* PG Grid */}
        {
          !loading && savedPgs.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {
                savedPgs.map((pg) => (
                  <PgCard
                    key={pg._id}
                    pg={pg}
                  />
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
};

export default SavedPg;
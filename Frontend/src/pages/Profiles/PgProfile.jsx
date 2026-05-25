// src/pages/pg/PGProfile.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const PGProfile = () => {
  const {user} = useAuth();
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const isOwner = user?._id===pg?.owner._id
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPg = async () => {

      try {

        const response = await api.get(`/listings/${id}`);
        console.log(response.data)
        setPg(response.data.listing);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchPg();

  }, [id]);

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // no pg found
  if (!pg) {
    return (
      <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center text-red-400">
        PG not found
      </div>
    );
  }

  // amenities array
  const amenities = [];

  if (pg?.amenities?.wifi) amenities.push("📶 WiFi");
  if (pg?.amenities?.ac) amenities.push("❄️ AC");
  if (pg?.amenities?.food) amenities.push("🍴 Food");
  if (pg?.amenities?.parking) amenities.push("🚗 Parking");
  if (pg?.amenities?.laundry) amenities.push("🧺 Laundry");
  if (pg?.amenities?.gym) amenities.push("🏋️ Gym");
  if (pg?.amenities?.hotWater) amenities.push("🚿 Hot Water");
  if (pg?.amenities?.cctv) amenities.push("📹 CCTV");

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden h-105">

          <img
            src={
              pg?.photos?.[0]?.url ||
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
            }
            alt="pg"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

          <div className="absolute bottom-8 left-8">

            <h1 className="text-4xl font-bold">
              {pg?.title}
            </h1>

            <p className="text-gray-300 mt-2">
              📍 {pg?.city}, {pg?.state}
            </p>

          </div>

        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-semibold mb-4">
                Description
              </h2>

              <p className="text-gray-400 leading-7">
                {pg?.description || "No description provided"}
              </p>

            </div>

            {/* Amenities */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-semibold mb-5">
                Amenities
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                {
                  amenities.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#1d1d25] p-4 rounded-2xl"
                    >
                      {item}
                    </div>
                  ))
                }

              </div>

            </div>

            {/* Rules */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-semibold mb-5">
                Rules
              </h2>

              <div className="space-y-3 text-gray-300">

                <div>
                  Smoking:
                  <span className="ml-2 text-white">
                    {pg?.rules?.smokingAllowed ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                <div>
                  Non-Veg:
                  <span className="ml-2 text-white">
                    {pg?.rules?.nonVegAllowed ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                <div>
                  Guests:
                  <span className="ml-2 text-white">
                    {pg?.rules?.guestsAllowed ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                <div>
                  Curfew:
                  <span className="ml-2 text-white">
                    {pg?.rules?.curfewTime || "No Curfew"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Price */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-3xl font-bold text-[#4ade80]">
                ₹ {pg?.rent}
              </h2>

              <p className="text-gray-400 mt-1">
                per month
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Room Type
                  </span>

                  <span className="capitalize">
                    {pg?.roomType}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    For
                  </span>

                  <span className="capitalize">
                    {pg?.genderPreference}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Deposit
                  </span>

                  <span>
                    ₹ {pg?.deposit}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Available Rooms
                  </span>

                  <span>
                    {pg?.availableRooms}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              {
                isOwner && (

                  <div className="flex flex-col gap-3 mt-8">

                    <button
                      onClick={() => navigate(`/listings/edit/${pg._id}`)}
                      className="bg-[#7c6ff7] hover:opacity-90 py-3 rounded-2xl font-medium"
                    >
                      Update Listing
                    </button>

                    <button
                      className="border border-red-500 text-red-400 hover:bg-red-500/10 py-3 rounded-2xl font-medium"
                    >
                      Delete Listing
                    </button>

                  </div>
                )
              }

            </div>

            {/* Owner */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-xl font-semibold mb-4">
                Owner
              </h2>

              <div className="flex items-center gap-4">

                <img
                  src={
                    pg?.owner?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="owner"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {pg?.owner?.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Owner
                  </p>

                </div>

              </div>

              <button className="w-full mt-6 bg-[#1d1d25] hover:bg-[#2a2a35] py-3 rounded-2xl">
                Contact Owner
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PGProfile;
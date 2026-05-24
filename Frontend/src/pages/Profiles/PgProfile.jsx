// src/pages/pg/PGProfile.jsx

import { useNavigate } from "react-router-dom";

const PGProfile = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden h-100">

          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
            alt="pg"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

          <div className="absolute bottom-8 left-8">

            <h1 className="text-4xl font-bold">
              Sunshine PG
            </h1>

            <p className="text-gray-300 mt-2">
              📍 Lucknow, Uttar Pradesh
            </p>

          </div>

        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-semibold mb-4">
                Description
              </h2>

              <p className="text-gray-400 leading-7">
                Fully furnished PG with WiFi, food, AC, laundry and parking facilities.
                Located near college and metro station.
              </p>

            </div>

            {/* Amenities */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-semibold mb-5">
                Amenities
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                <div className="bg-[#1d1d25] p-4 rounded-2xl">
                  📶 WiFi
                </div>

                <div className="bg-[#1d1d25] p-4 rounded-2xl">
                  ❄️ AC
                </div>

                <div className="bg-[#1d1d25] p-4 rounded-2xl">
                  🍴 Food
                </div>

                <div className="bg-[#1d1d25] p-4 rounded-2xl">
                  🚗 Parking
                </div>

                <div className="bg-[#1d1d25] p-4 rounded-2xl">
                  🧺 Laundry
                </div>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Price Card */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-3xl font-bold text-[#4ade80]">
                ₹ 8,500
              </h2>

              <p className="text-gray-400 mt-1">
                per month
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Room Type</span>
                  <span>Single</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">For</span>
                  <span>Boys</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Deposit</span>
                  <span>₹ 10,000</span>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-8">

                <button
                  onClick={() => navigate("/owner/listing/edit/1")}
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

            </div>

            {/* Owner */}
            <div className="bg-[#131318] border border-white/10 rounded-3xl p-6">

              <h2 className="text-xl font-semibold mb-4">
                Owner
              </h2>

              <div className="flex items-center gap-4">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="owner"
                  className="w-14 h-14 rounded-full"
                />

                <div>

                  <h3 className="font-semibold">
                    Rahul Sharma
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
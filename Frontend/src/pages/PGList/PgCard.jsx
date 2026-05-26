import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import api from "../../api/axios";
export const PgCard = ({ pg }) => {
  const {user} = useAuth();
  const [saved, setSaved] = useState(
    pg?.savedBy?.includes(user?._id)
  );
  const navigate = useNavigate();
    const handleSave = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        `/listings/${pg._id}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(response.data.saved);

    } catch (error) {

      console.log(error);
    }
  };
  return (

    <div className="bg-[#131318] border border-white/10 rounded-3xl overflow-hidden hover:border-[#7c6ff7]/40 transition-all">

      {/* Image */}
      <div className="relative h-52">

        <img
          src={
            pg?.photos?.[0]?.url ||
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
          }
          alt="pg"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 right-4 bg-[#7c6ff7] text-white text-xs px-3 py-1 rounded-full">
          {pg?.genderPreference}
        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex justify-between items-start gap-4">

          <div>
            <h2 className="text-lg font-semibold text-white">
              {pg?.title}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              {pg?.city}, {pg?.state}
            </p>
          </div>

          <div className="text-right">

            <h3 className="text-xl font-bold text-[#7c6ff7]">
              ₹{pg?.rent}
            </h3>

            <p className="text-xs text-gray-400">
              / month
            </p>

          </div>

        </div>

        {/* Room Info */}
        <div className="flex gap-3 mt-4 flex-wrap">

          <div className="bg-[#1a1a22] px-3 py-2 rounded-xl text-sm">
            {pg?.roomType}
          </div>

          <div className="bg-[#1a1a22] px-3 py-2 rounded-xl text-sm">
            {pg?.availableRooms} rooms
          </div>

        </div>

        {/* Amenities */}
        <div className="flex gap-2 mt-4 flex-wrap">

          {
            pg?.amenities?.wifi && (
              <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full">
                Wifi
              </span>
            )
          }

          {
            pg?.amenities?.food && (
              <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full">
                Food
              </span>
            )
          }

          {
            pg?.amenities?.ac && (
              <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full">
                AC
              </span>
            )
          }

          {
            pg?.amenities?.parking && (
              <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full">
                Parking
              </span>
            )
          }

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => navigate(`/listings/${pg._id}`)}
            className="flex-1 bg-[#7c6ff7] hover:opacity-90 transition-all py-3 rounded-2xl text-sm font-medium"
          >
            View Details
          </button>

          <button
            className={`px-4 rounded-2xl transition-all ${
              saved
                ? "bg-[#2563eb] text-white"
                : "bg-[#1a1a22] hover:bg-[#22222c]"
            }`}
            onClick={handleSave}
          >
            ❤️
          </button>

        </div>

      </div>

    </div>
  );
};
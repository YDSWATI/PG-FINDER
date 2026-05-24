// src/components/cards/PGCard.jsx

const PGCard = () => {

  return (

    <div className="bg-[#131318] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group">

      {/* ── Image ───────────────────── */}
      <div className="relative h-44 overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
          alt="PG"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

        {/* Top Tags */}
        <div className="absolute top-3 left-3 bg-[#7c6ff7] text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
          Single Room
        </div>

        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-sm border border-white/10 hover:bg-[#7c6ff7] transition">
          🤍
        </button>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl">
          <span className="text-[#4ade80] text-sm font-bold">
            ₹8,500
          </span>
          <span className="text-gray-300 text-xs">
            /mo
          </span>
        </div>

      </div>

      {/* ── Content ───────────────── */}
      <div className="p-4">

        {/* Title */}
        <div className="flex items-start justify-between gap-2">

          <div>

            <h2 className="text-white text-base font-semibold line-clamp-1">
              Sunshine PG
            </h2>

            <p className="text-gray-400 text-xs mt-1">
              📍 Lucknow, Uttar Pradesh
            </p>

          </div>

        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-3 line-clamp-2 leading-5">
          Fully furnished PG with food, AC and WiFi near college area.
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-4">

          <span className="px-2 py-1 text-[10px] rounded-lg bg-[#1d1d25] text-gray-300">
            WiFi
          </span>

          <span className="px-2 py-1 text-[10px] rounded-lg bg-[#1d1d25] text-gray-300">
            AC
          </span>

          <span className="px-2 py-1 text-[10px] rounded-lg bg-[#1d1d25] text-gray-300">
            Food
          </span>

          <span className="px-2 py-1 text-[10px] rounded-lg bg-[#1d1d25] text-gray-300">
            Laundry
          </span>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-5">

          <div className="text-xs text-gray-400">
            👥 Boys
          </div>

          <button className="px-4 py-2 rounded-xl bg-[#7c6ff7] text-white text-xs font-medium hover:opacity-90 transition">
            View
          </button>

        </div>

      </div>

    </div>

  );
};

export default PGCard;
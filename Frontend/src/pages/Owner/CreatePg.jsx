// src/pages/owner/CreatePg.jsx

import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePg = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    rent: "",
    deposit: "",
    roomType: "single",
    genderPreference: "any",
    availableRooms: 1,

    amenities: {
      wifi: false,
      food: false,
      ac: false,
      laundry: false,
      parking: false,
      gym: false,
      housekeeping: false,
      powerBackup: false,
      hotWater: false,
      cctv: false,
    },

    rules: {
      smokingAllowed: false,
      nonVegAllowed: true,
      guestsAllowed: false,
      curfewTime: "",
    },
  });

  const [photos, setPhotos] = useState([]);

  // ─── Handle text fields ─────────────────────────────
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ─── Handle amenities ───────────────────────────────
  const handleAmenityChange = (e) => {

    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: checked,
      },
    }));
  };

  // ─── Handle rules ───────────────────────────────────
  const handleRuleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      rules: {
        ...prev.rules,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  // ─── Handle photo upload ────────────────────────────
  const handlePhotos = (e) => {
    setPhotos([...e.target.files]);
  };

  // ─── Submit ─────────────────────────────────────────
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      // normal fields
      Object.keys(formData).forEach((key) => {

        if (
          key !== "amenities" &&
          key !== "rules"
        ) {
          data.append(key, formData[key]);
        }
      });

      // amenities
      data.append(
        "amenities",
        JSON.stringify(formData.amenities)
      );

      // rules
      data.append(
        "rules",
        JSON.stringify(formData.rules)
      );

      // photos
      photos.forEach((photo) => {
        data.append("photos", photo);
      });

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/listings/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("PG Listing Created");

      navigate("/owner/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = [
    "wifi",
    "food",
    "ac",
    "laundry",
    "parking",
    "gym",
    "housekeeping",
    "powerBackup",
    "hotWater",
    "cctv",
  ];

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#131318] sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Create PG Listing
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Add your PG details and publish your listing
            </p>
          </div>

        </div>

      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Basic Info */}
          <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="title"
                placeholder="PG Title"
                value={formData.title}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
              />

            </div>

            <textarea
              name="description"
              placeholder="Description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-5 bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-5 bg-[#1a1a22] border border-white/10 rounded-2xl p-4 outline-none"
            />

          </div>

          {/* Pricing */}
          <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Pricing & Rooms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

              <input
                type="number"
                name="rent"
                placeholder="Monthly Rent"
                value={formData.rent}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
              />

              <input
                type="number"
                name="deposit"
                placeholder="Deposit"
                value={formData.deposit}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
              />

              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>

              <select
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
              >
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="any">Any</option>
              </select>

            </div>

            <input
              type="number"
              name="availableRooms"
              placeholder="Available Rooms"
              value={formData.availableRooms}
              onChange={handleChange}
              className="mt-5 w-full md:w-80 bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
            />

          </div>

          {/* Amenities */}
          <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

              {
                amenitiesList.map((item) => (

                  <label
                    key={item}
                    className="bg-[#1a1a22] border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      name={item}
                      checked={formData.amenities[item]}
                      onChange={handleAmenityChange}
                    />

                    <span className="capitalize">
                      {item}
                    </span>

                  </label>
                ))
              }

            </div>

          </div>

          {/* Rules */}
          <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <label className="bg-[#1a1a22] rounded-2xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={formData.rules.smokingAllowed}
                  onChange={handleRuleChange}
                />
                Smoking Allowed
              </label>

              <label className="bg-[#1a1a22] rounded-2xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="nonVegAllowed"
                  checked={formData.rules.nonVegAllowed}
                  onChange={handleRuleChange}
                />
                Non Veg Allowed
              </label>

              <label className="bg-[#1a1a22] rounded-2xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="guestsAllowed"
                  checked={formData.rules.guestsAllowed}
                  onChange={handleRuleChange}
                />
                Guests Allowed
              </label>

            </div>

            <input
              type="text"
              name="curfewTime"
              placeholder="Curfew Time (optional)"
              value={formData.rules.curfewTime}
              onChange={handleRuleChange}
              className="mt-5 w-full md:w-96 bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
            />

          </div>

          {/* Photos */}
          <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Upload Photos
            </h2>

            <input
              type="file"
              multiple
              onChange={handlePhotos}
              className="w-full bg-[#1a1a22] border border-white/10 rounded-2xl p-4"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c6ff7] hover:opacity-90 transition-all rounded-2xl py-5 text-lg font-semibold"
          >
            {
              loading
                ? "Creating Listing..."
                : "Create PG Listing"
            }
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreatePg;
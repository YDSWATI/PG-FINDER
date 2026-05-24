import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const UpdateHabits = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sleepTime: "",
    foodPref: "",
    noiseLevel: "",
    cleanliness: "",
    field: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await api.patch(
        "/auth/me/habits",
        formData
      );

      console.log(response.data);

      alert("Habits updated successfully");

    //   navigate("/matches");

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

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 border-r border-white/10 relative overflow-hidden">

        <div className="absolute -top-30 -left-30 w-87.5 h-87.5 bg-violet-500/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-25 -right-25 w-75 h-75  bg-cyan-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Find your
            <span className="text-violet-400"> perfect roommate</span>
          </h1>

          <p className="text-gray-400 text-lg leading-8 max-w-xl">
            Your lifestyle habits help us match you with people
            who actually fit your daily routine and personality.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-violet-400"></div>
              <p className="text-gray-300">
                Better roommate compatibility
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <p className="text-gray-300">
                Smart preference based matching
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <p className="text-gray-300">
                Personalized recommendations
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-2xl">

          <div className="mb-10">

            <h2 className="text-4xl font-bold mb-3">
              Update Habits
            </h2>

            <p className="text-gray-400">
              Tell us about your lifestyle preferences
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* Sleep */}
            <div>

              <label className="block mb-3 text-sm text-gray-300">
                Sleep Schedule
              </label>

              <div className="grid grid-cols-3 gap-4">

                {[
                  {
                    label: "Early Bird",
                    value: "early_bird",
                  },
                  {
                    label: "Flexible",
                    value: "flexible",
                  },
                  {
                    label: "Night Owl",
                    value: "night_owl",
                  },
                ].map((item) => (

                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        sleepTime: item.value,
                      })
                    }
                    className={`p-4 rounded-2xl border transition-all duration-300
                    ${
                      formData.sleepTime === item.value
                        ? "bg-violet-500 border-violet-500 text-white"
                        : "bg-[#16161c] border-white/10 text-gray-300 hover:border-violet-400"
                    }`}
                  >
                    {item.label}
                  </button>

                ))}

              </div>

            </div>

            {/* Food */}
            <div>

              <label className="block mb-3 text-sm text-gray-300">
                Food Preference
              </label>

              <select
                name="foodPref"
                value={formData.foodPref}
                onChange={handleChange}
                className="w-full bg-[#16161c] border border-white/10 rounded-2xl p-4 outline-none focus:border-violet-500"
              >
                <option value="">Select preference</option>
                <option value="veg">Vegetarian</option>
                <option value="non_veg">Non Veg</option>
                <option value="vegan">Vegan</option>
                <option value="no_preference">
                  No Preference
                </option>
              </select>

            </div>

            {/* Noise */}
            <div>

              <label className="block mb-3 text-sm text-gray-300">
                Noise Level
              </label>

              <div className="grid grid-cols-3 gap-4">

                {[
                  {
                    label: "Silent",
                    value: "silent",
                  },
                  {
                    label: "Moderate",
                    value: "moderate",
                  },
                  {
                    label: "Social",
                    value: "social",
                  },
                ].map((item) => (

                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        noiseLevel: item.value,
                      })
                    }
                    className={`p-4 rounded-2xl border transition-all duration-300
                    ${
                      formData.noiseLevel === item.value
                        ? "bg-cyan-500 border-cyan-500 text-white"
                        : "bg-[#16161c] border-white/10 text-gray-300 hover:border-cyan-400"
                    }`}
                  >
                    {item.label}
                  </button>

                ))}

              </div>

            </div>

            {/* Cleanliness */}
            <div>

              <label className="block mb-3 text-sm text-gray-300">
                Cleanliness
              </label>

              <select
                name="cleanliness"
                value={formData.cleanliness}
                onChange={handleChange}
                className="w-full bg-[#16161c] border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500"
              >
                <option value="">Select cleanliness</option>
                <option value="very_neat">Very Neat</option>
                <option value="average">Average</option>
                <option value="relaxed">Relaxed</option>
              </select>

            </div>

            {/* Field */}
            <div>

              <label className="block mb-3 text-sm text-gray-300">
                Field
              </label>

              <select
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full bg-[#16161c] border border-white/10 rounded-2xl p-4 outline-none focus:border-yellow-500"
              >
                <option value="">Select field</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="mba">MBA</option>
                <option value="arts">Arts</option>
                <option value="law">Law</option>
                <option value="other">Other</option>
              </select>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 transition-all duration-300 p-4 rounded-2xl font-semibold text-lg"
            >
              {
                loading
                  ? "Saving..."
                  : "Save Habits"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default UpdateHabits;
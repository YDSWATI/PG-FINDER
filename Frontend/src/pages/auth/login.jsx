import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      if (response.data.user.role === "seeker") {
        navigate("/seeker");
      }
      else {
        navigate("/owner");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center px-4">

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#131318] border border-white/10 rounded-3xl p-8">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">

          <div className="w-11 h-11 rounded-xl bg-[#7c6ff7] flex items-center justify-center text-white font-bold text-lg">
            PG
          </div>

          <div>

            <h1 className="text-white text-xl font-semibold">
              PGMatch
            </h1>

            <p className="text-gray-500 text-sm">
              Find your perfect stay
            </p>

          </div>

        </div>

        {/* Heading */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm">
            Login to continue exploring PGs & roommates.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
            />

          </div>

          {/* Password */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm text-gray-400">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-[#7c6ff7] hover:underline"
              >
                Forgot?
              </button>

            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-[#1a1a22] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c6ff7] hover:opacity-90 transition-all text-white py-3 rounded-2xl font-semibold"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">

          Don’t have an account?

          <span
            onClick={() => navigate("/register")}
            className="text-[#7c6ff7] ml-2 cursor-pointer hover:underline font-medium"
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}
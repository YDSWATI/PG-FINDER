import { useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    role: "seeker",
  });

  const [loading, setLoading] = useState(false);

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
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration Successful");

      navigate("/login");

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

    <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center px-6">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#7c6ff7]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="mb-10 text-center">

          <div className="inline-flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-2xl bg-[#7c6ff7] flex items-center justify-center text-white font-bold text-lg">
              PG
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              PGMatch
            </h1>

          </div>

          <h2 className="text-4xl font-bold text-white mb-3">
            Create Account
          </h2>

          <p className="text-gray-400 text-sm leading-6">
            Join PGMatch and discover compatible PGs
            and roommates near you.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-[#131318] border border-white/10 rounded-3xl p-8 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
              />

            </div>

            {/* Email */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
              />

            </div>

            {/* Password */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
              />

            </div>

            {/* City + Phone */}
            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
                />

              </div>

              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone no."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#7c6ff7] transition-all"
                />

              </div>

            </div>

            {/* Role */}
            <div>

              <label className="text-sm text-gray-300 mb-2 block">
                Register As
              </label>

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "seeker",
                    })
                  }
                  className={`rounded-xl py-3 border transition-all ${
                    formData.role === "seeker"
                      ? "bg-[#7c6ff7] border-[#7c6ff7] text-white"
                      : "bg-[#1a1a22] border-white/10 text-gray-400"
                  }`}
                >
                  Seeker
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "owner",
                    })
                  }
                  className={`rounded-xl py-3 border transition-all ${
                    formData.role === "owner"
                      ? "bg-[#7c6ff7] border-[#7c6ff7] text-white"
                      : "bg-[#1a1a22] border-white/10 text-gray-400"
                  }`}
                >
                  Owner
                </button>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7c6ff7] hover:bg-[#6b5cf0] transition-all text-white py-3 rounded-xl font-semibold mt-2"
            >
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 mt-8 text-sm">

            Already have an account?

            <Link
              to="/login"
              className="text-white font-medium ml-2 hover:text-[#a89cf7] transition-all"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;
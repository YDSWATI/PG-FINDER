import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      console.log(response.data.user);

      localStorage.setItem(
        "token",
        response.data.token
      );

      if(response.data.user.role === "seeker"){
        navigate("/seeker")
      }
      else{
        navigate("/owner")
      }

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
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between bg-black text-white p-12 relative overflow-hidden">

          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Find Your Perfect PG & Roommate
            </h1>

            <p className="text-lg text-gray-300 leading-8 max-w-lg">
              Discover verified PGs, connect with compatible roommates,
              and make your relocation stress-free with smart matching.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-300 mt-2">Verified PG Listings</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <h3 className="text-3xl font-bold">95%</h3>
              <p className="text-gray-300 mt-2">Successful Matches</p>
            </div>
          </div>
        </div>


        {/* Right Section */}
        <div className="flex items-center justify-center p-8 sm:p-12">

          <div className="w-full max-w-md">

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back 👋
              </h2>

              <p className="text-gray-500 text-lg">
                Login to continue exploring PGs.
              </p>
            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>


              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-black font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>


              {/* Remember */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-black" />
                  Remember me
                </label>
              </div>


              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 transition-all text-white py-3 rounded-xl font-semibold text-lg shadow-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>


            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>


            

            {/* Footer */}
            <p className="text-center text-gray-500 mt-8">
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-black font-semibold cursor-pointer ml-2 hover:underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

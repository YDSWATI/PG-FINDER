import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Register = () => {

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

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("User registered successfully");

      // empty all fields after success
      setFormData({
        name: "",
        email: "",
        password: "",
        city: "",
        phone: "",
        role: "seeker",
      });

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="seeker">Seeker</option>
          <option value="owner">Owner</option>
        </select>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg mb-4"
        >
          {
            loading
              ? "Registering..."
              : "Register"
          }
        </button>

        {/* Login Button */}
        <Link to="/login">
          <button
            type="button"
            className="w-full border border-black p-3 rounded-lg"
          >
            Already have an account? Login
          </button>
        </Link>

      </form>

    </div>
  );
};

export default Register;
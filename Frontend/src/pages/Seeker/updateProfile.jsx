import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const UpdateProfile = () => {

  const { user, setUser } = useAuth();

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    budgetMin: "",
    budgetMax: "",
    avatar: null,
  });

  // prefill data
  useEffect(() => {

    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        budgetMin: user.budget?.min || "",
        budgetMax: user.budget?.max || "",
        avatar: null,
      });

      setPreview(user.avatar || "");
    }

  }, [user]);

  // handle text input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle avatar
  const handleAvatar = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        avatar: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("city", formData.city);

      data.append(
        "budget",
        JSON.stringify({
          min: formData.budgetMin,
          max: formData.budgetMax,
        })
      );

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const token = localStorage.getItem("token");

        console.log(token);

        const response = await api.put(
        "/auth/update-profile",
        data,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        }
        );

      console.log(response.data);

      // update context user
      setUser(response.data.user);

      alert("Profile updated successfully");

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

    <div className="min-h-screen bg-[#0c0c0f] text-white flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-2xl bg-[#131318] border border-white/10 rounded-3xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Update Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* avatar */}
          <div className="flex flex-col items-center gap-4">

            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#7c6ff7]"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="text-sm"
            />

          </div>

          {/* name */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c6ff7]"
            />
          </div>

          {/* phone */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c6ff7]"
            />
          </div>

          {/* city */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c6ff7]"
            />
          </div>

          {/* budget */}
          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Budget Range
            </label>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                name="budgetMin"
                placeholder="Min Budget"
                value={formData.budgetMin}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c6ff7]"
              />

              <input
                type="number"
                name="budgetMax"
                placeholder="Max Budget"
                value={formData.budgetMax}
                onChange={handleChange}
                className="bg-[#1a1a22] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#7c6ff7]"
              />

            </div>

          </div>

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c6ff7] hover:bg-[#6b5df0] transition-all rounded-xl py-3 font-semibold"
          >
            {
              loading
                ? "Updating..."
                : "Update Profile"
            }
          </button>

        </form>

      </div>

    </div>
  );
};

export default UpdateProfile;
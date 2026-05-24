// src/pages/profile/MyProfile.jsx

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const MyProfile = () => {

        const { user } = useAuth();
        const navigate = useNavigate();

        const deleteAccount = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) return;

        try {

            const response = await api.delete(
            "/auth/me"
            );

            console.log(response.data);

            alert("Account deleted successfully");

            // remove token
            localStorage.removeItem("token");

            // remove user if stored
            localStorage.removeItem("user");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
            error.response?.data?.message ||
            "Failed to delete account"
            );
        }
        };

  return (

    <div className="min-h-screen bg-[#0c0c0f] text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-[#131318] border border-white/10 rounded-3xl p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Avatar */}
            <div className="relative">

              <img
                src={
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
                className="w-36 h-36 rounded-full object-cover border-4 border-[#7c6ff7]"
              />

              <button
                className="absolute bottom-2 right-2 bg-[#7c6ff7] w-10 h-10 rounded-full flex items-center justify-center"
              >
                ✏️
              </button>

            </div>

            {/* Info */}
            <div className="flex-1">

              <div className="flex items-center gap-3">

                <h1 className="text-3xl font-bold">
                  {user?.name}
                </h1>

                <span className="px-3 py-1 rounded-full text-xs bg-[#1d1d25] text-[#7c6ff7]">
                  {user?.role}
                </span>

              </div>

              <p className="text-gray-400 mt-2">
                {user?.email}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                <div className="bg-[#1a1a22] rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">
                    City
                  </p>
                  <h3 className="text-lg font-semibold mt-1">
                    {user?.city}
                  </h3>
                </div>

                <div className="bg-[#1a1a22] rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">
                    Phone
                  </p>
                  <h3 className="text-lg font-semibold mt-1">
                    {user?.phone}
                  </h3>
                </div>

                {
                  user?.role === "seeker" && (
                    <div className="bg-[#1a1a22] rounded-2xl p-4">
                      <p className="text-gray-400 text-sm">
                        Budget
                      </p>
                     <h3>
                        ₹{user.budget.min} - ₹{user.budget.max}
                        </h3>
                    </div>
                  )
                }

              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() => navigate("/profile/edit")}
                  className="bg-[#7c6ff7] hover:opacity-90 px-6 py-3 rounded-2xl text-sm font-medium"
                >
                  Update Profile
                </button>

                <button
                  onClick={()=>{
                    deleteAccount();
                  }}
                  className="border border-red-500 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-2xl text-sm font-medium"
                >
                  Delete Account
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default MyProfile;
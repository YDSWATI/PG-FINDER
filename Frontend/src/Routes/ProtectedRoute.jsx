import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {

  const { user, token, loading } = useAuth();

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  // not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // role based protection
  if (
    allowedRole &&
    user?.role !== allowedRole
  ) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
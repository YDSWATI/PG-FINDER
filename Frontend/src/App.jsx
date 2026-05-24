import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import SeekerDashboard from "./pages/Seeker/SeekerDashboard";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import Home from "./pages/Home/Home";
import { AllPgList } from "./pages/PGList/AllPgList";
import PGProfile from "./pages/Profiles/PgProfile";
import MyProfile from "./pages/Profiles/MyProfile";
function App() {
  return (

      <Routes>
        <Route path="/register" element={<Register />} />


        <Route path="/login" element={<LoginPage />} /> 

        <Route path="/seeker" element ={<SeekerDashboard/>} />
        <Route path="/owner" element ={<OwnerDashboard/>} />
        <Route path="/home" element ={<Home/>} />
        <Route path="/pglist" element ={<AllPgList/>} />
        <Route path="/pgprofile" element ={<PGProfile/>} />
        <Route path="/myprofile" element ={<MyProfile/>} />


         
      </Routes>
  
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import SeekerDashboard from "./pages/Seeker/SeekerDashboard";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import Home from "./pages/Home/Home";
import ExplorePg from "./pages/PGList/AllPgList";
import PGProfile from "./pages/Profiles/PgProfile";
import MyProfile from "./pages/Profiles/MyProfile";
import UpdateProfile from "./pages/Seeker/updateProfile";
import UpdateHabits from "./pages/Seeker/updateHabits";
import CreatePg from "./pages/Owner/CreatePg";
function App() {
  return (

      <Routes>
        <Route path="/register" element={<Register />} />


        <Route path="/login" element={<LoginPage />} /> 

        <Route path="/seeker" element ={<SeekerDashboard/>} />
        <Route path="/owner" element ={<OwnerDashboard/>} />
        <Route path="/home" element ={<Home/>} />
        {/* <Route path="/pglist" element ={<AllPgList/>} /> */}
        <Route path="/listings/:id" element ={<PGProfile/>} />
        <Route path="/myprofile" element ={<MyProfile/>} />
        <Route path="/updateProfile" element ={<UpdateProfile/>} />
        <Route path="/updateHabits" element ={<UpdateHabits/>} />
        <Route path="/createpg" element ={<CreatePg/>} />
        <Route path="/explorepg" element ={<ExplorePg/>} />


         
      </Routes>
  
  );
}

export default App;

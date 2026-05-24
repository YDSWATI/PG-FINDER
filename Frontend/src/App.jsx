import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import LoginPage from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} /> 
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;

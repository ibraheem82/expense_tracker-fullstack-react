import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar"
import { getUserFromStorage } from "./utils/getUserFromStorage";
import { useSelector } from "react-redux";


function App() {
const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
    {/* NavBar */}
    
    {user ? <PrivateNavbar /> : <PublicNavbar />}
    <Routes>
    <Route path="/" element={<HeroSection />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegistrationForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

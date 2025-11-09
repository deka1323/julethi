import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import BridalWear from './pages/BridalWear';
import OccasionWear from './pages/OccasionWear';
import MensWear from './pages/MensWear';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop'; // ✅ added
import HouseOfLuit from './pages/HouseOfLuit';
import CustomOrder from "./pages/CustomOrder";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/bridal" element={<BridalWear />} />
        <Route path="/shop/occasion" element={<OccasionWear />} />
        <Route path="/shop/men" element={<MensWear />} />
        <Route path="/house-of-luit" element={<HouseOfLuit />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/custom" element={<CustomOrder />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ Scrolls to top on route change */}
      <Layout />
    </Router>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Instagram, Facebook, ChevronDown, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopHoverTimeout, setShopHoverTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleShopMouseEnter = () => {
    if (shopHoverTimeout) {
      clearTimeout(shopHoverTimeout);
    }
    setIsShopOpen(true);
  };

  const handleShopMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsShopOpen(false);
    }, 300);
    setShopHoverTimeout(timeout);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-teal-900/95 backdrop-blur-md shadow-lg' : 'bg-teal-900'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition-colors duration-200 text-sm"
            >
              Home
            </Link>
            <div
              className="relative group"
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
            >
              <Link
                to="/shop"
                className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200 text-sm"
              >
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {isShopOpen && (
                <div
                  className="absolute top-full left-0 bg-white shadow-xl rounded-lg mt-1 py-2 w-48 border border-emerald-100"
                  onMouseEnter={handleShopMouseEnter}
                  onMouseLeave={handleShopMouseLeave}
                >
                  <Link
                    to="/shop/bridal"
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-sm"
                  >
                    Bridal Wear
                  </Link>
                  <Link
                    to="/shop/occasion"
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-sm"
                  >
                    Occasion Wear
                  </Link>
                  <Link
                    to="/shop/fusion"
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-sm"
                  >
                    Fusion Wear
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="text-white hover:text-yellow-300 transition-colors duration-200 text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-300 transition-colors duration-200 text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="block text-center">
              <h1 className="text-xl md:text-2xl font-serif text-white font-bold">Julethi</h1>
              <p className="text-xs text-yellow-300 tracking-wide">by Zinku</p>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <Facebook className="h-4 w-4" />
            </a>

            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-40 px-3 py-1 text-sm border-none rounded-full bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-white hover:text-yellow-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-yellow-300 transition-colors duration-200"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            <Link
              to="/profile"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <User className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-yellow-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-emerald-700 border-t border-emerald-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm">Home</Link>
              <Link to="/shop" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm">Shop</Link>
              <Link to="/shop/bridal" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm pl-6">Bridal Wear</Link>
              <Link to="/shop/occasion" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm pl-6">Occasion Wear</Link>
              <Link to="/shop/fusion" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm pl-6">Fusion Wear</Link>
              <Link to="/about" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm">About Us</Link>
              <Link to="/contact" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm">Contact</Link>
              <Link to="/profile" className="block px-3 py-2 text-white hover:text-yellow-300 text-sm">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
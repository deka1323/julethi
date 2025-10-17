import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Instagram, Facebook, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopHoverTimeout, setShopHoverTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (path) =>
    `text-sm transition-colors duration-200 ${
      location.pathname === path
        ? 'text-yellow-400 font-medium'
        : 'text-white hover:text-yellow-300'
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleShopMouseEnter = () => {
    if (shopHoverTimeout) clearTimeout(shopHoverTimeout);
    setIsShopOpen(true);
  };

  const handleShopMouseLeave = () => {
    const timeout = setTimeout(() => setIsShopOpen(false), 300);
    setShopHoverTimeout(timeout);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-teal-900/95 backdrop-blur-md shadow-lg' : 'bg-teal-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 relative">
          {/* Desktop Left Nav */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>

            <div
              className="relative group"
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
            >
              <Link to="/shop" className={`flex items-center ${linkClass('/shop')}`}>
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              {isShopOpen && (
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg mt-1 py-2 w-48 border border-emerald-100">
                  <Link
                    to="/shop/bridal"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      location.pathname === '/shop/bridal'
                        ? 'bg-yellow-50 text-yellow-700 font-medium'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    Bridal Wear
                  </Link>
                  <Link
                    to="/shop/occasion"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      location.pathname === '/shop/occasion'
                        ? 'bg-yellow-50 text-yellow-700 font-medium'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    Occasion Wear
                  </Link>
                  <Link
                    to="/shop/fusion"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      location.pathname === '/shop/fusion'
                        ? 'bg-yellow-50 text-yellow-700 font-medium'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                    }`}
                  >
                    Party Wear
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className={linkClass('/about')}>
              About Us
            </Link>
            <Link to="/contact" className={linkClass('/contact')}>
              Contact
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
            <Link to="/" className="block text-center">
              <img
                src="/images/logonavbar.png"
                alt="Julethi by Zinku"
                className="h-10 md:h-14 object-contain mx-auto"
              />
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end text-sm">
            <a
              href="https://www.instagram.com/julethi_by_zinku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/zinkumk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-300"
            >
              <Facebook className="h-4 w-4" />
            </a>

            {/* Search */}
            <div className="relative flex items-center ml-2">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-36 px-3 py-[3px] text-sm border border-yellow-300/70 rounded-full bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-white hover:text-yellow-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-yellow-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Right - Search + Hamburger */}
          <div className="md:hidden flex items-center space-x-3 ml-auto">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-yellow-300"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-yellow-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {isSearchOpen && !isMobileMenuOpen && (
          <div className="md:hidden px-4 py-2 bg-teal-800 border-t border-teal-700">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm border border-yellow-300 rounded-full bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 text-white hover:text-yellow-300"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-teal-900 border-t border-teal-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['/', '/shop', '/shop/bridal', '/shop/occasion', '/shop/fusion', '/about', '/contact'].map((path, i) => (
                <Link
                  key={i}
                  to={path}
                  className={`block px-3 py-2 text-sm ${
                    location.pathname === path ? 'text-yellow-400 font-medium' : 'text-white hover:text-yellow-300'
                  } ${path.includes('/shop/') ? 'pl-6' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)} 
                >
                  {path === '/' && 'Home'}
                  {path === '/shop' && 'Shop'}
                  {path === '/shop/bridal' && 'Bridal Wear'}
                  {path === '/shop/occasion' && 'Occasion Wear'}
                  {path === '/shop/fusion' && 'Fusion Wear'}
                  {path === '/about' && 'About Us'}
                  {path === '/contact' && 'Contact'}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

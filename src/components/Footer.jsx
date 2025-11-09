import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-crimson-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          {/* Brand */}
          <div className="col-span-1 text-center sm:text-left">
            <img
              src="/images/logonavbar.png"
              alt="Julethi by Zinku"
              className="h-10 sm:h-12 mb-1 sm:mb-2 mx-auto sm:mx-0 object-contain"
            />
            <p className="text-white text-xs mb-2 sm:mb-4">by Zinku</p>
            <p className="text-crimson-300 text-xs leading-relaxed">
              Celebrating Assamese heritage through exquisite couture, blending traditional craftsmanship with contemporary elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-semibold text-amber-300 mb-2 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">Home</Link></li>
              <li><Link to="/about" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-semibold text-amber-300 mb-2 sm:mb-4">Shop</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/shop" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">All Collection</Link></li>
              <li><Link to="/shop/bridal" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">Bridal Wear</Link></li>
              <li><Link to="/shop/occasion" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">Occasion Wear</Link></li>
              <li><Link to="/shop/men" className="text-crimson-300 hover:text-white transition-colors text-xs sm:text-sm">Mens Wear</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-semibold text-amber-300 mb-2 sm:mb-4">Get in Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs">
                <MapPin className="h-3 w-3 text-amber-300" />
                <span className="text-crimson-300">Bormotoria, Guwahati, Assam</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs">
                <Phone className="h-3 w-3 text-amber-300" />
                <span className="text-crimson-300">+91 7002772312</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs">
                <Mail className="h-3 w-3 text-amber-300" />
                <span className="text-crimson-300">zinuraaz@gmail.com</span>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start space-x-3 mt-2">
                <a href="https://instagram.com/julethi_by_zinku" target="_blank" rel="noopener noreferrer" className="text-crimson-300 hover:text-amber-300 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com/zinkumk/" target="_blank" rel="noopener noreferrer" className="text-crimson-300 hover:text-amber-300 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <Link to="/login" className="text-crimson-300 hover:text-amber-300 transition-colors">
                  <Lock className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-crimson-700 mt-6 pt-4 text-center">
          <p className="text-crimson-400 text-xs sm:text-sm">
            © 2025 Julethi by Zinku. All rights reserved. | Powered by Ampire Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

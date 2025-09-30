import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-serif font-bold text-yellow-300 mb-2">Julethi</h2>
            <p className="text-teal-200 text-xs mb-4">by Zinku</p>
            <p className="text-teal-300 text-xs leading-relaxed">
              Celebrating Assamese heritage through exquisite couture, blending traditional craftsmanship with contemporary elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-yellow-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-teal-300 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/shop/bridal" className="text-teal-300 hover:text-white transition-colors text-sm">Bridal Wear</Link></li>
              <li><Link to="/shop/occasion" className="text-teal-300 hover:text-white transition-colors text-sm">Occasion Wear</Link></li>
              <li><Link to="/shop/fusion" className="text-teal-300 hover:text-white transition-colors text-sm">Fusion Wear</Link></li>
              <li><Link to="/about" className="text-teal-300 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-teal-300 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-base font-semibold text-yellow-300 mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-teal-300 hover:text-white transition-colors text-sm">Size Guide</Link></li>
              <li><Link to="#" className="text-teal-300 hover:text-white transition-colors text-sm">Care Instructions</Link></li>
              <li><Link to="#" className="text-teal-300 hover:text-white transition-colors text-sm">Return Policy</Link></li>
              <li><Link to="#" className="text-teal-300 hover:text-white transition-colors text-sm">Shipping Info</Link></li>
              <li><Link to="#" className="text-teal-300 hover:text-white transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-yellow-300 mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-yellow-300" />
                <span className="text-teal-300 text-xs">Guwahati, Assam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 text-yellow-300" />
                <span className="text-teal-300 text-xs">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 text-yellow-300" />
                <span className="text-teal-300 text-xs">hello@julethi.com</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="text-teal-300 hover:text-yellow-300 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="text-teal-300 hover:text-yellow-300 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-700 mt-8 pt-8 text-center">
          <p className="text-teal-400 text-xs">
            © 2024 Julethi by Zinku. All rights reserved. | Crafted with love in Assam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();

  // WhatsApp business number (replace with actual number)
  const whatsappNumber = "+917002772312";

  const handleWhatsAppClick = () => {
    const currentUrl = window.location.href;
    const message = `Hi! I'm interested in your collection and would like to know more about your designs.\nI'm currently viewing: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowPopup(false);
  };

  // Hide welcome bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Hide button on specific pages
  const hideOnPages = ["/shop", "/product","/custom"];
  const isHidden = hideOnPages.some((path) =>
    location.pathname.startsWith(path)
  );

  if (isHidden) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-float-y">
        <button
          onClick={() => setShowPopup(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 overflow-hidden"
        >
          <img
            src="/images/whatsapp.png"
            alt="WhatsApp"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Welcome bubble on landing */}
        {showWelcome && (
          <div className="bg-white shadow-lg rounded-lg px-4 py-2 text-sm text-gray-700 animate-fade-in-up">
            Welcome, feel free to have a chat
          </div>
        )}
      </div>

      {/* Chat Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Chat with us</h3>
                  <p className="text-sm text-gray-600">We're here to help!</p>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                Hi! I'm interested in your collection and would like to know
                more about your designs.
              </p>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <img
                src="/images/whatsapp.png"
                alt="WhatsApp"
                className="h-5 w-5"
              />
              <span>Start WhatsApp Chat</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              You'll be redirected to WhatsApp
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;

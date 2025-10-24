import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = product.images?.length > 0 ? product.images : [product.imgUrl];

  // 🖱️ Auto Slide on Hover (for desktop)
  const handleMouseEnter = () => {
    if (images.length > 1) {
      let i = currentIndex;
      intervalRef.current = setInterval(() => {
        i = (i + 1) % images.length;
        setCurrentIndex(i);
      }, 1200);
    }
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex(0);
  };

  // 📱 Touch Handling for Mobile Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative w-full sm:w-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-transparent hover:border-teal-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 🖼️ Image Slider */}
      <div className="relative overflow-hidden h-72 rounded-t-2xl">
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2.5 py-1 text-[10px] font-semibold uppercase rounded-full tracking-wider shadow-md z-10">
            New
          </span>
        )}

        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex w-full h-72 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="w-full h-72 flex-shrink-0 object-cover"
              draggable="false"
            />
          ))}
        </div>

        {/* 💖 Wishlist Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white">
            <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" />
          </button>
        </div>

        {/* 🔘 Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🏷️ Product Info */}
      <div className="p-4 bg-gradient-to-br from-white via-teal-50/20 to-white">
        <h3 className="text-base font-semibold text-gray-800 mb-1 truncate font-serif group-hover:text-teal-700 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2 italic leading-snug">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-teal-800">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

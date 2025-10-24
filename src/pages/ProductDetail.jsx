import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, MessageCircle, Tag, Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate("/shop")}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.imgUrl];
  const totalImages = images.length;

  // 🌀 Auto-slide on hover (desktop)
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 1500); // slower transition
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // 📱 Swipe gestures for mobile
  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
      else setCurrentIndex((prev) => (prev + 1) % totalImages);
    }
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setCurrentImage((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else {
        setCurrentImage((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    }
  };

  const handleWhatsAppClick = () => {
    const currentUrl = window.location.href;
    const message = `Hi! I am interested in the product "${product.name}". Could you please share more details?\n\nProduct Link: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/917002772312?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const recommended = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-teal-50/10 py-20 px-4">
      {/* Product Layout */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-auto grid md:grid-cols-2 overflow-hidden">

        {/* 🖼️ Product Image Carousel */}
        {/* Product Image Carousel */}
        {/* 🖼️ Product Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex justify-center items-center bg-gray-50 p-8"
        >
          <div
            className="relative w-80 h-96 md:w-[420px] md:h-[500px] overflow-hidden rounded-2xl shadow-md border border-gray-200 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Slider Wrapper */}
            <div
              ref={sliderRef}
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="w-full h-full flex-shrink-0 object-contain bg-white"
                />
              ))}
            </div>

            {/* ⬅️ Prev & Next Buttons */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentImage === i ? "bg-teal-600 scale-110" : "bg-gray-300"
                    }`}
                ></button>
              ))}
            </div>

            {/* ❤️ Wishlist */}
            <div className="absolute top-4 right-4">
              <button className="bg-white/80 hover:bg-gradient-to-r from-rose-400 to-pink-500 hover:text-white p-2 rounded-full shadow-md transition-all">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {product.isNewArrival && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-md">
              New
            </div>
          )}
        </motion.div>



        {/* 📄 Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-white via-teal-50/5 to-white"
        >
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-teal-700 mb-5 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            {/* Product Info */}
            <div className="mb-5">
              <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-[11px] font-medium mb-2">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Wear
              </span>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 leading-snug">
                {product.name}
              </h1>
              <p className="text-lg font-semibold text-teal-700 mb-2">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Description & Details */}
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Description</h3>
                <p className="leading-relaxed text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Fabric</h3>
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2 text-teal-600" /> {product.fabric}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Product Details</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Handcrafted with premium materials</li>
                  <li>Perfect for special occasions</li>
                  <li>Customization available</li>
                  <li>Dry clean only</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6 flex justify-center">
            <div className="w-full sm:w-[50%]">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-700 transition duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buy via WhatsApp</span>
              </button>
              <p className="text-[11px] text-gray-500 text-center mt-2">
                Includes this product link in message
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🛍️ You May Also Like */}
      {recommended.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {recommended.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, MessageCircle, Tag, Heart, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProduct } from "../redux/actions/productActions";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);

  // Zoom modal swipe refs
  const zoomTouchStart = useRef(0);
  const zoomTouchEnd = useRef(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const images =
    product?.images && product.images.length > 0
      ? product.images
      : product?.imgUrl
      ? [product.imgUrl]
      : [];
  const totalImages = images.length;

  // Auto-slide on hover (desktop)
  useEffect(() => {
    if (!product || !isHovered || totalImages === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, totalImages, product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crimson-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Loading product...
          </h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="text-crimson-600 hover:text-crimson-700 font-medium"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Swipe gestures for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentImage((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    }
  };

  // WhatsApp CTA
  const handleWhatsAppClick = () => {
    const origin = window.location.origin;
    const productPath = `${origin}/product/${product.id}`;
    const message = `Hi! I am interested in the product "${product.name}". Could you please share more details?\n\nProduct Link: ${productPath}`;
    const whatsappUrl = `https://wa.me/917002772312?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const recommended = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Zoom modal swipe handling
  const handleZoomTouchStart = (e) => {
    zoomTouchStart.current = e.touches[0].clientX;
  };
  const handleZoomTouchMove = (e) => {
    zoomTouchEnd.current = e.touches[0].clientX;
  };
  const handleZoomTouchEnd = () => {
    const deltaX = zoomTouchStart.current - zoomTouchEnd.current;
    if (Math.abs(deltaX) > 75) {
      if (deltaX > 0) {
        // Swipe left → next
        setCurrentImage((prev) =>
          prev === totalImages - 1 ? 0 : prev + 1
        );
      } else {
        // Swipe right → prev
        setCurrentImage((prev) =>
          prev === 0 ? totalImages - 1 : prev - 1
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-crimson-50/10 py-20 px-4">
      {/* Product Layout */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl mx-auto grid md:grid-cols-2 overflow-hidden">
        {/* 🖼️ Product Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex justify-center items-center bg-gray-50 p-8"
        >
          <div
            className="relative w-80 h-96 md:w-[420px] md:h-[500px] overflow-hidden rounded-2xl shadow-md border border-gray-200 group cursor-zoom-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsZoomed(true)}
          >
            {/* Slider Wrapper */}
            <div
              ref={sliderRef}
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => {}}
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

            {/* Prev/Next Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentImage === i
                      ? "bg-crimson-600 scale-110"
                      : "bg-gray-300"
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
          className="p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-white via-crimson-50/5 to-white"
        >
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-crimson-700 mb-5 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <div className="mb-5">
              <span className="inline-block bg-crimson-100 text-crimson-700 px-3 py-1 rounded-full text-[11px] font-medium mb-2">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}{" "}
                Wear
              </span>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1 leading-snug">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-3 mb-3">
                <span className="text-gray-500 text-sm">
                  MRP{" "}
                  <span className="line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </span>
                <span className="text-xl font-semibold text-gray-900">
                  ₹{product.discountedPrice?.toLocaleString("en-IN")}
                </span>
                {product.discountedPrice &&
                  product.price > product.discountedPrice && (
                    <span className="text-sm font-medium text-green-600">
                      (
                      {Math.round(
                        ((product.price - product.discountedPrice) /
                          product.price) *
                          100
                      )}
                      % OFF)
                    </span>
                  )}
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Description
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Fabric
                </h3>
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2 text-crimson-600" />{" "}
                  {product.fabric}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Product Details
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.productDetails ? (
                    product.productDetails.map((i, idx) => <li key={idx}>{i}</li>)
                  ) : (
                    <div>
                      <li>Handcrafted with premium materials</li>
                      <li>Perfect for special occasions</li>
                      <li>Customization available</li>
                      <li>Dry clean only</li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-full sm:w-[50%]">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-500 hover:to-green-700 transition duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buy via WhatsApp</span>
              </button>
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

      {/* 🔍 Zoom Modal with Swipe */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Zoomed"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg cursor-zoom-out select-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleZoomTouchStart}
              onTouchMove={handleZoomTouchMove}
              onTouchEnd={handleZoomTouchEnd}
            />

            {/* Arrows inside modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) =>
                  prev === 0 ? totalImages - 1 : prev - 1
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) =>
                  prev === totalImages - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Tag } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
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

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price.toLocaleString(
      "en-IN"
    )})`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl grid md:grid-cols-2 gap-6 overflow-hidden">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full h-96 md:h-auto"
        >
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-contain md:object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
          />
          {product.isNewArrival && (
            <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
              New
            </div>
          )}
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 md:p-10 flex flex-col justify-between"
        >
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            {/* Name, Category & Price */}
            <div className="mb-4">
              <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Wear
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 truncate">
                {product.name}
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-teal-700">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Description, Fabric & Details */}
            <div className="space-y-4 text-sm md:text-base">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Description</h3>
                <p className="text-gray-600 leading-snug">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Fabric</h3>
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2 text-teal-600" /> {product.fabric}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Product Details</h3>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  <li>Handcrafted with premium materials</li>
                  <li>Perfect for special occasions</li>
                  <li>Customization available</li>
                  <li>Dry clean only</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="mt-6">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Buy via WhatsApp</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Chat with us on WhatsApp for purchase and customization
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

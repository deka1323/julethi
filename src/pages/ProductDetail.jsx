import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Tag } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price.toLocaleString('en-IN')})`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNewArrival && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  New Arrival
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 md:p-12"
            >
              <div className="mb-6">
                <div className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Wear
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-teal-700">₹{product.price.toLocaleString('en-IN')}</p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Fabric</h3>
                  <div className="flex items-center text-gray-600">
                    <Tag className="w-5 h-5 mr-2 text-teal-600" />
                    {product.fabric}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>Handcrafted with premium materials</li>
                    <li>Perfect for special occasions</li>
                    <li>Customization available</li>
                    <li>Dry clean only</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Buy via WhatsApp</span>
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Click to chat with us on WhatsApp for purchase and customization
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative w-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-transparent hover:border-teal-200"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2.5 py-1 text-[10px] font-semibold uppercase rounded-full tracking-wider shadow-md z-10">
            New
          </span>
        )}

        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-105"
        />

        {/* Overlay with Heart Icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white">
            <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Product Info */}
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

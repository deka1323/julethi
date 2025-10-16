import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative w-64 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative">
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white px-2.5 py-1 text-[10px] font-semibold uppercase rounded-full tracking-wider z-10">
            New
          </span>
        )}
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay + Heart */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
            <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-1 truncate group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-snug">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {/* Optional discounted price or tag */}
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

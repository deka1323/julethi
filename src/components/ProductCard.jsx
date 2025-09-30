import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden mb-4">
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
            New
          </span>
        )}
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm text-gray-700 mb-2 group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-teal-600">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </Link>
  );
}

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts, deleteProduct } from "../../redux/actions/productActions";
import { Edit, Trash2, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductList() {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [imageIndices, setImageIndices] = useState({}); // current image per product
  const intervals = useRef({}); // to store interval references

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
      } catch (error) {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const startAutoSlide = (id, imagesLength) => {
    if (intervals.current[id]) return; // already running
    intervals.current[id] = setInterval(() => {
      setImageIndices((prev) => ({
        ...prev,
        [id]: ((prev[id] || 0) + 1) % imagesLength,
      }));
    }, 2000);
  };

  const stopAutoSlide = (id) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">All Products</h1>
        <p className="text-slate-600 mt-1">Manage your product inventory</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="bridal">Bridal</option>
              <option value="fusion">Fusion</option>
              <option value="occasion">Occasion</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-slate-600 mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              const images = product.images?.length ? product.images : [product.imgUrl];
              const currentIndex = imageIndices[product.id] || 0;
              const currentImage = images[currentIndex];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  {/* Image Section */}
                  <div
                    className="relative aspect-square overflow-hidden"
                    onMouseEnter={() => startAutoSlide(product.id, images.length)}
                    onMouseLeave={() => stopAutoSlide(product.id)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={currentImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </AnimatePresence>

                    {product.isNewArrival && (
                      <span className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
                        New
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md capitalize">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1 truncate">{product.name}</h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-700">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

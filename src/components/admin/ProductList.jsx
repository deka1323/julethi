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
  const [imageIndices, setImageIndices] = useState({});
  const intervals = useRef({});

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
      } catch {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const startAutoSlide = (id, length) => {
    if (intervals.current[id]) return;
    intervals.current[id] = setInterval(() => {
      setImageIndices((prev) => ({
        ...prev,
        [id]: ((prev[id] || 0) + 1) % length,
      }));
    }, 2000);
  };

  const stopAutoSlide = (id) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 px-3 sm:px-4 md:px-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-800">
          All Products
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
          Manage your product inventory
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 md:p-4">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-8 pr-6 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="bridal">Bridal</option>
              <option value="mensWear">Mens Wear</option>
              <option value="occasion">Occasion</option>
              <option value="houseOfLuit">House of Luit</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-600 mb-3">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-10 text-slate-600">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-slate-600">No products found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product, index) => {
              const images = product.images?.length ? product.images : [product.imgUrl];
              const currentIndex = imageIndices[product.id] || 0;
              const currentImage = images[currentIndex];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="group bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
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
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </AnimatePresence>

                    {product.isNewArrival && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-[2px] rounded-full text-[10px] font-medium shadow">
                        New
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-3">
                    <span className="inline-block px-2 py-[2px] bg-slate-100 text-slate-700 text-[10px] rounded-md capitalize mb-1">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-slate-800 text-xs sm:text-sm mb-0.5 truncate">
                      {product.name}
                    </h3>

                    <p className="text-slate-600 text-[11px] sm:text-xs mb-1 line-clamp-2">
                      {product.description}
                    </p>


                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.discountedPrice ? (
                          <>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-teal-700">
                                ₹{product.discountedPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[11px] text-slate-400 line-through">
                                ₹{product.price.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-green-600 font-medium">
                                ({Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF)
                              </span>
                            </div>

                            <div className="flex space-x-1">
                              <button
                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-teal-700">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>

                        )}
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

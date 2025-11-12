import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { fetchAllProducts } from '../redux/actions/productActions';
import ImageCarousel from '../components/ImageCarousel';

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewArrivalsOnly, setShowNewArrivalsOnly] = useState(filterParam === 'new');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const allProducts = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setShowNewArrivalsOnly(filterParam === 'new');
  }, [filterParam]);

  let filteredProducts = allProducts;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (showNewArrivalsOnly) {
    filteredProducts = filteredProducts.filter(product => product.isNewArrival);
  }

  if (selectedCategory !== 'all') {
    // Handle both 'mensWear' and legacy 'men' category values
    if (selectedCategory === 'mensWear') {
      filteredProducts = filteredProducts.filter(product => product.category === 'mensWear' || product.category === 'men');
    } else {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
  }
  // When 'all' is selected, no category filtering is applied, so all products (including houseOfLuit) are shown

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const categories = [
    { id: 'all', name: 'All Collections', count: showNewArrivalsOnly ? allProducts.filter(p => p.isNewArrival).length : allProducts.length },
    { id: 'bridal', name: 'Bridal Wear', count: showNewArrivalsOnly ? allProducts.filter(p => p.category === 'bridal' && p.isNewArrival).length : allProducts.filter(p => p.category === 'bridal').length },
    { id: 'occasion', name: 'Occasion Wear', count: showNewArrivalsOnly ? allProducts.filter(p => p.category === 'occasion' && p.isNewArrival).length : allProducts.filter(p => p.category === 'occasion').length },
    { id: 'mensWear', name: 'Mens Wear', count: showNewArrivalsOnly ? allProducts.filter(p => (p.category === 'mensWear' || p.category === 'men') && p.isNewArrival).length : allProducts.filter(p => p.category === 'mensWear' || p.category === 'men').length },
    { id: 'houseOfLuit', name: 'House of Luit', count: showNewArrivalsOnly ? allProducts.filter((p) => p.category === 'houseOfLuit' && p.isNewArrival).length : allProducts.filter((p) => p.category === 'houseOfLuit').length },
  ];

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-crimson-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : showNewArrivalsOnly ? 'New Arrivals' : 'All Collections'}
          </h1>
          <p className="text-gray-600">
            {searchQuery
              ? `Found ${filteredProducts.length} items`
              : showNewArrivalsOnly
                ? 'Discover our latest additions'
                : 'Discover our complete collection of handcrafted Assamese couture'
            }
          </p>
        </div>

        {/* Category Filter */}
<div className="mb-8">
  <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
    {/* New Arrivals Toggle */}
    <button
      onClick={() => setShowNewArrivalsOnly(!showNewArrivalsOnly)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        showNewArrivalsOnly
          ? 'bg-rose-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600'
      }`}
    >
      {showNewArrivalsOnly ? '✓ ' : ''}New Arrivals Only
    </button>

    {/* Custom Order Button */}
    <Link
      to="/custom"
      className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-crimson-700 hover:bg-crimson-200 transition shadow-sm"

    >
      Custom Order
    </Link>
  </div>

  {/* Category Buttons */}
  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === category.id
            ? 'bg-crimson-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-crimson-50 hover:text-crimson-600'
        }`}
      >
        {category.name} ({category.count})
      </button>
    ))}
  </div>
</div>


        

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-crimson-100 text-crimson-600' : 'text-gray-400'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-crimson-100 text-crimson-600' : 'text-gray-400'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <span className="text-gray-600 hidden sm:inline">{filteredProducts.length} products</span>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-crimson-600">
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div
            className={`grid gap-6 justify-center ${viewMode === "grid"
              ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1"
              }`}
          >
            {filteredProducts.map((product) => {
              const mainImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : product.imgUrl;
              console.log("mainImage : ", mainImage)
              const hoverImage =
                product.images && product.images.length > 1
                  ? product.images[1]
                  : mainImage;
              console.log("hoverImage :", hoverImage)

              return (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className={`group cursor-pointer ${viewMode === "list"
                    ? "flex flex-col sm:flex-row space-x-0 sm:space-x-6"
                    : "w-full max-w-[280px] sm:max-w-full mx-auto"
                    }`}
                >
                  {/* Image Container */}
                  {/* Image Carousel Container */}
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-sm group ${viewMode === "list"
                      ? "w-full sm:w-48 h-60 sm:h-48 flex-shrink-0 mb-2 sm:mb-0"
                      : "h-80 sm:h-80 mb-4"
                      }`}
                  >
                    {product.isNewArrival && (
                      <span className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                        New
                      </span>
                    )}

                    {/* Image Carousel */}
                    <ImageCarousel images={product.images || [product.imgUrl]} />

                    {/* Wishlist Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={viewMode === "list" ? "flex-1 mt-2 sm:mt-0" : ""}>
                    <h3 className="text-sm text-gray-800 font-medium mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {product.discountedPrice ? (
                        <>
                          <span className="text-sm font-semibold text-rose-600">
                            ₹{product.discountedPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-green-600 font-medium">
                            ({Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF)
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-crimson-700">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {viewMode === "list" && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}



        {/* No results */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
            <Link
              to="/shop"
              className="inline-block mt-4 text-crimson-600 hover:text-crimson-700 font-semibold"
            >
              View all products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;

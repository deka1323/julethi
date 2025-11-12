import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, Grid, List, Heart } from 'lucide-react';
import { fetchAllProducts, fetchProduct } from '../redux/actions/productActions';
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/ProductCard';

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

  const handleProductClick = async (productId) => {
    await dispatch(fetchProduct(productId));
  };

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
      filteredProducts = filteredProducts.filter(product =>
        product.category === 'mensWear' || product.category === 'men'
      );
    } else {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
  } else {
    // When 'all' is selected, exclude HouseOfLuit products
    filteredProducts = filteredProducts.filter(product => product.category !== 'houseOfLuit');
  }

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const categories = [
    { id: 'all', name: 'All Collections', count: showNewArrivalsOnly ? allProducts.filter(p => p.isNewArrival && p.category !== 'houseOfLuit').length : allProducts.filter(p => p.category !== 'houseOfLuit').length },
    { id: 'bridal', name: 'Bridal Wear', count: showNewArrivalsOnly ? allProducts.filter(p => p.category === 'bridal' && p.isNewArrival).length : allProducts.filter(p => p.category === 'bridal').length },
    { id: 'occasion', name: 'Occasion Wear', count: showNewArrivalsOnly ? allProducts.filter(p => p.category === 'occasion' && p.isNewArrival).length : allProducts.filter(p => p.category === 'occasion').length },
    { id: 'mensWear', name: 'Mens Wear', count: showNewArrivalsOnly ? allProducts.filter(p => (p.category === 'mensWear' || p.category === 'men') && p.isNewArrival).length : allProducts.filter(p => p.category === 'mensWear' || p.category === 'men').length },
    { id: 'houseOfLuit', name: 'House of Luit', count: showNewArrivalsOnly ? allProducts.filter((p) => p.category === 'houseOfLuit' && p.isNewArrival).length : allProducts.filter((p) => p.category === 'houseOfLuit').length }
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
        <div className="mb-6">
          {/* Top Row: New Arrivals + Custom Order */}
          <div className="flex justify-center sm:justify-between items-center gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setShowNewArrivalsOnly(!showNewArrivalsOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${showNewArrivalsOnly
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600'
                }`}
            >
              {showNewArrivalsOnly ? '✓ ' : ''}New Arrivals Only
            </button>

            {/* Gradient Custom Order Button */}
            <Link
              to="/custom"
              className="bg-gradient-to-r from-crimson-600 to-crimson-500 hover:opacity-90 text-amber-200 text-sm font-medium px-5 py-2 rounded-full shadow-md transition-all duration-300 whitespace-nowrap"
            >
              Custom Order
            </Link>
          </div>

          {/* Scrollable Category Row */}
          <div className="relative">
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 sm:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? 'bg-crimson-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-crimson-50 hover:text-crimson-600'
                    }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
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
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
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

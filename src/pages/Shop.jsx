import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, Heart, Star } from 'lucide-react';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // default grid
  const [sortBy, setSortBy] = useState('featured');

  // Sample products - in real app, this would come from API
  const allProducts = [
    {
      id: 1,
      name: 'Classic Muga Silk Mekhela',
      category: 'bridal',
      price: 55000,
      originalPrice: 65000,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 5,
      reviews: 24,
      isNew: false,
      isSale: true
    },
    {
      id: 2,
      name: 'Handwoven Eri Silk Saree',
      category: 'occasion',
      price: 35000,
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 18,
      isNew: true,
      isSale: false
    },
    {
      id: 3,
      name: 'Designer Lehenga Set',
      category: 'bridal',
      price: 42000,
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 4,
      reviews: 31,
      isNew: false,
      isSale: false
    },
    {
      id: 4,
      name: 'Contemporary Kurta Set',
      category: 'fusion',
      price: 15000,
      originalPrice: 18000,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 4,
      reviews: 12,
      isNew: true,
      isSale: true
    },
    {
      id: 5,
      name: 'Royal Assamese Gamusa Saree',
      category: 'occasion',
      price: 28000,
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 5,
      reviews: 22,
      isNew: false,
      isSale: false
    },
    {
      id: 6,
      name: 'Fusion Indo-Western Dress',
      category: 'fusion',
      price: 22000,
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 4,
      reviews: 8,
      isNew: true,
      isSale: false
    }
  ];

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : selectedCategory === 'all'
      ? allProducts
      : allProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Collections', count: allProducts.length },
    { id: 'bridal', name: 'Bridal Wear', count: allProducts.filter(p => p.category === 'bridal').length },
    { id: 'occasion', name: 'Occasion Wear', count: allProducts.filter(p => p.category === 'occasion').length },
    { id: 'fusion', name: 'Fusion Wear', count: allProducts.filter(p => p.category === 'fusion').length }
  ];

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-teal-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Collections'}
          </h1>
          <p className="text-gray-600">
            {searchQuery
              ? `Found ${filteredProducts.length} items`
              : 'Discover our complete collection of handcrafted Assamese couture'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-400'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-400'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              <span className="text-gray-600">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-teal-600">
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1'
            }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`group cursor-pointer ${viewMode === 'list' ? 'flex space-x-6' : ''
                }`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'mb-4'
                  }`}>
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                      Sale
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === 'list' ? 'h-48' : 'h-80'
                      }`}
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h3 className="text-sm text-gray-700 mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-teal-600 text-sm">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {viewMode === 'list' && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      Exquisite handcrafted piece showcasing traditional Assamese artistry with contemporary elegance.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
              <Link
                to="/shop"
                className="inline-block mt-4 text-teal-600 hover:text-teal-700 font-semibold"
              >
                View all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
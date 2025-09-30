import { Heart, Star } from 'lucide-react';

const OccasionWear = () => {
  const occasionProducts = [
    {
      id: 1,
      name: 'Festive Silk Saree',
      price: '₹35,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 22,
      isNew: true,
      description: 'Perfect for Bihu celebrations and festive gatherings'
    },
    {
      id: 2,
      name: 'Elegant Pat Silk Mekhela',
      price: '₹28,000',
      originalPrice: '₹32,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 4,
      reviews: 18,
      description: 'Traditional Pat silk with contemporary styling'
    },
    {
      id: 3,
      name: 'Designer Gamusa Print Ensemble',
      price: '₹24,000',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 5,
      reviews: 31,
      description: 'Modern interpretation of traditional Gamusa patterns'
    },
    {
      id: 4,
      name: 'Party Wear Silk Set',
      price: '₹42,000',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 4,
      reviews: 15,
      isNew: true,
      description: 'Sophisticated ensemble for evening celebrations'
    },
    {
      id: 5,
      name: 'Cultural Event Lehenga',
      price: '₹48,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 27,
      description: 'Perfect for cultural programs and performances'
    },
    {
      id: 6,
      name: 'Wedding Guest Outfit',
      price: '₹38,000',
      originalPrice: '₹45,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 4,
      reviews: 20,
      description: 'Elegant choice for wedding ceremonies'
    }
  ];

  const occasionCategories = [
    {
      name: 'Festival Wear',
      description: 'Traditional outfits for Bihu, Durga Puja, and other celebrations',
      count: 12
    },
    {
      name: 'Wedding Guest',
      description: 'Elegant ensembles perfect for wedding ceremonies',
      count: 8
    },
    {
      name: 'Cultural Events',
      description: 'Sophisticated pieces for cultural programs and performances',
      count: 6
    },
    {
      name: 'Party Wear',
      description: 'Contemporary styles for evening gatherings and parties',
      count: 10
    }
  ];

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-900 to-purple-700 text-white py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
            alt="Occasion wear hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Occasion Wear
          </h1>
          <p className="text-xl text-pink-100 max-w-2xl mx-auto">
            Celebrate life's special moments with our curated collection of festive and occasion wear.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Shop by Occasion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasionCategories.map((category, index) => (
              <div key={index} className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <span className="text-teal-600 font-medium">{category.count} pieces</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-serif font-bold text-teal-900 mb-2">
                Occasion Wear Collection
              </h2>
              <p className="text-gray-600">{occasionProducts.length} beautiful pieces</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>All Occasions</option>
                <option>Festival Wear</option>
                <option>Wedding Guest</option>
                <option>Cultural Events</option>
                <option>Party Wear</option>
              </select>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Sort by Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {occasionProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4">
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                      New
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full z-10">
                      Sale
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-teal-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Style Guide */}
          <div className="mt-16 bg-gradient-to-r from-teal-50 to-teal-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                Styling Guide
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Not sure what to wear for your upcoming event? Our styling experts are here to help you choose the perfect outfit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Festival Ready</h4>
                <p className="text-sm text-gray-600">Traditional silks and vibrant colors for festive celebrations</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💒</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Wedding Guest</h4>
                <p className="text-sm text-gray-600">Elegant ensembles that complement without competing</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎭</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cultural Events</h4>
                <p className="text-sm text-gray-600">Sophisticated pieces for performances and cultural programs</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors">
                Get Styling Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OccasionWear;

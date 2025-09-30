import { Heart, Star, Sparkles } from 'lucide-react';

const FusionWear = () => {
  const fusionProducts = [
    {
      id: 1,
      name: 'Contemporary Assamese Jacket Dress',
      price: '₹22,000',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 5,
      reviews: 18,
      isNew: true,
      description: 'Modern silhouette with traditional Assamese motifs'
    },
    {
      id: 2,
      name: 'Indo-Western Kurta Set',
      price: '₹18,000',
      originalPrice: '₹21,000',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 4,
      reviews: 24,
      description: 'Blend of ethnic charm with contemporary comfort'
    },
    {
      id: 3,
      name: 'Fusion Crop Top & Palazzo Set',
      price: '₹16,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 12,
      isNew: true,
      description: 'Trendy fusion wear with Assamese textile accents'
    },
    {
      id: 4,
      name: 'Modern Mekhela Skirt',
      price: '₹14,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 4,
      reviews: 20,
      description: 'Traditional silhouette reimagined for modern women'
    },
    {
      id: 5,
      name: 'Designer Cape Dress',
      price: '₹25,000',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 5,
      reviews: 15,
      description: 'Statement piece combining elegance with cultural heritage'
    },
    {
      id: 6,
      name: 'Fusion Jumpsuit with Gamusa Detailing',
      price: '₹20,000',
      originalPrice: '₹24,000',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 4,
      reviews: 16,
      description: 'Contemporary jumpsuit with traditional Assamese elements'
    }
  ];

  const styleFeatures = [
    {
      icon: '🌟',
      title: 'Versatile Styling',
      description: 'Perfect for both office and evening events'
    },
    {
      icon: '🎨',
      title: 'Cultural Heritage',
      description: 'Traditional motifs in contemporary designs'
    },
    {
      icon: '✨',
      title: 'Comfort First',
      description: 'Modern cuts designed for all-day comfort'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      description: 'Finest fabrics and expert craftsmanship'
    }
  ];

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-700 text-white py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg"
            alt="Fusion wear hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-2" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Fusion Collection
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400 ml-2" />
          </div>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Where tradition meets modernity. Contemporary designs infused with the soul of Assamese heritage.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
            Why Choose Fusion Wear?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {styleFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
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
                Fusion Wear Collection
              </h2>
              <p className="text-gray-600">{fusionProducts.length} trendy pieces</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>All Styles</option>
                <option>Indo-Western</option>
                <option>Contemporary</option>
                <option>Modern Traditional</option>
              </select>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Sort by Trending</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fusionProducts.map((product) => (
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
                      <span className="text-gray-500 line-through text-xs">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Style Inspiration */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                  Style It Your Way
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our fusion pieces are designed to be versatile. Mix and match with your existing wardrobe for endless styling possibilities.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Office Chic</h4>
                    <p className="text-sm text-gray-600">Pair our kurta sets with blazers for professional elegance</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Weekend Casual</h4>
                    <p className="text-sm text-gray-600">Style crop tops with jeans for a relaxed contemporary look</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Evening Glam</h4>
                    <p className="text-sm text-gray-600">Dress up cape dresses with statement jewelry</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                  Book Personal Styling Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FusionWear;

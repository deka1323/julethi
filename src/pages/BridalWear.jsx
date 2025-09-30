import { Heart, Star } from 'lucide-react';

const BridalWear = () => {
  const bridalProducts = [
    {
      id: 1,
      name: 'Royal Muga Silk Mekhela Chador',
      price: '₹85,000',
      originalPrice: '₹95,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 5,
      reviews: 32,
      isNew: true,
      description: 'Exquisite handwoven Muga silk with traditional Assamese motifs'
    },
    {
      id: 2,
      name: 'Heritage Bridal Lehenga',
      price: '₹72,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 28,
      description: 'Intricate gold work on pure silk with matching dupatta'
    },
    {
      id: 3,
      name: 'Classic Assamese Bridal Ensemble',
      price: '₹65,000',
      image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
      rating: 4,
      reviews: 24,
      description: 'Traditional red and gold combination with handwoven details'
    },
    {
      id: 4,
      name: 'Contemporary Bridal Saree',
      price: '₹58,000',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 5,
      reviews: 19,
      isNew: true,
      description: 'Modern interpretation of classical Assamese bridal wear'
    },
    {
      id: 5,
      name: 'Golden Eri Silk Wedding Set',
      price: '₹78,000',
      originalPrice: '₹88,000',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      rating: 5,
      reviews: 41,
      description: 'Luxurious Eri silk with intricate golden threadwork'
    },
    {
      id: 6,
      name: 'Designer Bridal Lehenga',
      price: '₹92,000',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      rating: 5,
      reviews: 15,
      description: 'Contemporary cut with traditional Assamese embroidery'
    }
  ];

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-900 to-teal-700 text-white py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
            alt="Bridal collection hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Bridal Collection
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Timeless elegance for your most precious moments. Each piece is crafted to make your wedding day unforgettable.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-2xl font-serif font-bold text-teal-900 mb-2">
                Bridal Wear Collection
              </h2>
              <p className="text-gray-600">{bridalProducts.length} exquisite pieces</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Sort by Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bridalProducts.map((product) => (
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

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-teal-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                Need Something Custom?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our designers can create a bespoke bridal ensemble tailored specifically for your special day. 
                Let us bring your dream outfit to life.
              </p>
              <button className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BridalWear;

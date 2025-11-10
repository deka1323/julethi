import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts, fetchProduct } from '../redux/actions/productActions';
import { useEffect } from 'react';

const OccasionWear = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const occasionProducts = products.filter((p) => p.category === 'occasion');

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleProductClick = async (productId) => {
    await dispatch(fetchProduct(productId));
  };

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-crimson-900 to-crimson-700 text-white py-12">
        <div className="absolute inset-0">
          <img
            src="/images/j2.jpeg"
            alt="Occasion collection hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Occasion Wear Collection
          </h1>
          <p className="text-base md:text-lg text-amber-100 max-w-2xl mx-auto">
            Perfect for celebrations and festivities. Elegant pieces for every special moment.
          </p>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-serif font-bold text-crimson-900 mb-2">
                Occasion Wear Collection
              </h2>
              <p className="text-gray-600">{occasionProducts.length} elegant pieces</p>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {occasionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default OccasionWear;

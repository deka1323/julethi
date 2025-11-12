import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProduct } from '../redux/actions/productActions';
import { useNavigate } from 'react-router-dom';

const BridalWear = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const bridalProducts = products.filter((p) => p.category === 'bridal');

  const handleProductClick = async (productId) => {
    await dispatch(fetchProduct(productId));
  };

  return (
    <div className="pt-14 min-h-screen">
      {/* 🌸 Hero Section */}
      <section className="relative bg-gradient-to-r from-crimson-900 to-crimson-700 text-white py-12">
        <div className="absolute inset-0">
          <img
            src="/images/j2.jpeg"
            alt="Bridal collection hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Bridal Collection
          </h1>
          <p className="text-base md:text-lg text-amber-100 max-w-2xl mx-auto">
            Timeless elegance for your most precious moments. Each piece is crafted
            to make your wedding day unforgettable.
          </p>
        </div>
      </section>

      {/* 💍 Compact Custom Order Section */}
<section className="bg-gradient-to-b from-white to-crimson-50 py-8 px-4">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
    {/* Text Section */}
    <div className="md:w-3/4">
      <h2 className="text-xl md:text-2xl font-serif font-semibold text-crimson-900 mb-2">
        Customize Your Bridal Look
      </h2>
      <p className="text-gray-700 text-sm md:text-base max-w-xl">
        Create a one-of-a-kind bridal outfit designed just for you- from fabric
        to finishing touch.
      </p>
    </div>

    {/* Button Section */}
    <div className="md:w-auto">
      <button
        onClick={() => navigate('/custom')}
        className="bg-gradient-to-r from-crimson-700 to-crimson-900 text-white px-5 py-2 rounded-md font-semibold hover:from-crimson-800 hover:to-crimson-950 transition text-sm md:text-base shadow-md w-full md:w-auto"
      >
        Start Custom Order
      </button>
    </div>
  </div>
</section>


      {/* 🛍️ Product Collection */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-serif font-bold text-crimson-900 mb-2">
                Bridal Wear Collection
              </h2>
              <p className="text-gray-600">{bridalProducts.length} exquisite pieces</p>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {bridalProducts.map((product) => (
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

export default BridalWear;

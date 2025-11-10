import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchAllProducts, fetchProduct } from '../redux/actions/productActions';
import { useEffect } from 'react';

const HouseOfLuit = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log("ALL PRODUCTS : ", products)


  const houseOfLuitProducts = products.filter(
    (p) =>
      p.category === 'houseOfLuit'
  );

  console.log("houseOfLuitProducts : ", houseOfLuitProducts)

  // Filter relevant categories
  // const houseOfLuitProducts = houseOfLuitProducts.filter(
  //   (p) =>
  //     p.category === 'cotton' ||
  //     p.category === 'home-decor' ||
  //     p.category === 'jewelry'
  // );

  const handleProductClick = async (productId) => {
    await dispatch(fetchProduct(productId));
  };

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-800 to-amber-600 text-white py-12">
        <div className="absolute inset-0">
          <img
            src="/images/luit.png"
            alt="House of Luit hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            House of Luit
          </h1>
          <p className="text-base md:text-lg text-amber-100 max-w-2xl mx-auto">
            Discover the essence of Assam- elegant cotton attire, handcrafted
            home décor, and timeless accessories that celebrate culture and
            craftsmanship.
          </p>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                The Cotton & Lifestyle Collection
              </h2>
              <p className="text-gray-600">
                {houseOfLuitProducts.length} beautifully handcrafted pieces
              </p>
            </div>
          </div>

          {/* Subcategory Info
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 text-center">
            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Cotton Attire
              </h3>
              <p className="text-gray-600 text-sm">
                Experience breathable elegance with handwoven cotton wear.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Handcrafted Home Decor
              </h3>
              <p className="text-gray-600 text-sm">
                Artisanal pieces that bring warmth and culture to your space.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Jewelry & Accessories
              </h3>
              <p className="text-gray-600 text-sm">
                Statement adornments inspired by Assam’s rich heritage.
              </p>
            </div>
          </div> */}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {houseOfLuitProducts.map((product) => (
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

export default HouseOfLuit;

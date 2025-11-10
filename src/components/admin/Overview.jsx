import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package, TrendingUp, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchAllProducts } from '../../redux/actions/productActions';

export default function Overview() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const totalProducts = products.length;
  const bridalCount = products.filter((p) => p.category === 'bridal').length;
  const menCount = products.filter((p) => p.category === 'mensWear').length;
  const occasionCount = products.filter((p) => p.category === 'occasion').length;
  const houseOfLuitCount = products.filter((p) => p.category === 'houseOfLuit').length;
  const newArrivals = products.filter((p) => p.isNewArrival).length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = totalProducts > 0 ? (totalValue / totalProducts).toFixed(0) : 0;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'New Arrivals',
      value: newArrivals,
      icon: Sparkles,
      color: 'bg-rose-500',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      title: 'Avg. Price',
      value: `₹${parseInt(averagePrice).toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Value',
      value: `₹${totalValue.toLocaleString('en-IN')}`,
      icon: ShoppingBag,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const categoryData = [
    { name: 'Bridal Wear', count: bridalCount, color: 'bg-pink-500', percentage: ((bridalCount / totalProducts) * 100).toFixed(0) },
    { name: 'Mens Wear', count: menCount, color: 'bg-blue-500', percentage: ((menCount / totalProducts) * 100).toFixed(0) },
    { name: 'Occasion Wear', count: occasionCount, color: 'bg-teal-500', percentage: ((occasionCount / totalProducts) * 100).toFixed(0) },
    { name: 'House of Luit', count: houseOfLuitCount, color: 'bg-amber-500', percentage: ((houseOfLuitCount / totalProducts) * 100).toFixed(0) },
  ];

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 text-sm tracking-wide">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Here’s your boutique summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-medium">{stat.title}</p>
                  <p className="text-lg font-semibold text-slate-800 leading-tight">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-2.5 rounded-xl`}>
                  <Icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 tracking-tight">
            Category Distribution
          </h3>
          <div className="space-y-3">
            {categoryData.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">
                    {category.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {category.count} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 tracking-tight">
            Recent Products
          </h3>
          <div className="space-y-2.5">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-slate-50 transition"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-slate-500 capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  {product.discountedPrice ? (
                    <>
                      <p className="text-xs font-semibold text-slate-800">
                        ₹{product.discountedPrice.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px] text-slate-400 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs font-semibold text-slate-800">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  )}

                  {product.isNewArrival && (
                    <span className="text-[10px] text-rose-600 font-medium">
                      New
                    </span>
                  )}
                </div>

              </div>
            ))}
            {recentProducts.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">
                No products added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

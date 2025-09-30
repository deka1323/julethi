import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Upload, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Plus,
  LogOut,
  Image,
  DollarSign,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    isNew: false,
    isSale: false,
    originalPrice: ''
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log('Product uploaded:', productForm);
    alert('Product uploaded successfully!');
    // Reset form
    setProductForm({
      name: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
      isNew: false,
      isSale: false,
      originalPrice: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const stats = [
    { title: 'Total Products', value: '156', icon: Package, color: 'text-blue-600 bg-blue-100' },
    { title: 'Total Orders', value: '89', icon: ShoppingBag, color: 'text-green-600 bg-green-100' },
    { title: 'Total Customers', value: '234', icon: Users, color: 'text-purple-600 bg-purple-100' },
    { title: 'Revenue', value: '₹4.2L', icon: DollarSign, color: 'text-yellow-600 bg-yellow-100' }
  ];

  const recentOrders = [
    { id: '#001', customer: 'Priya Sharma', product: 'Royal Muga Silk Mekhela', amount: '₹85,000', status: 'Processing' },
    { id: '#002', customer: 'Anita Das', product: 'Heritage Bridal Lehenga', amount: '₹72,000', status: 'Completed' },
    { id: '#003', customer: 'Ritu Gogoi', product: 'Contemporary Kurta Set', amount: '₹18,000', status: 'Shipped' },
    { id: '#004', customer: 'Minu Baruah', product: 'Festive Silk Saree', amount: '₹35,000', status: 'Processing' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your Julethi collection and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          {[
            { id: 'products', name: 'Add Product', icon: Plus },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id || tab.id === 'products'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">

          {/* Product Upload Tab */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Upload className="h-6 w-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={productForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={productForm.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select category</option>
                      <option value="bridal">Bridal Wear</option>
                      <option value="occasion">Occasion Wear</option>
                      <option value="fusion">Fusion Wear</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      value={productForm.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (₹) - Optional
                    </label>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      value={productForm.originalPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter original price"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      required
                      value={productForm.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter image URL"
                    />
                    <Image className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={productForm.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={productForm.isNew}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Mark as New</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isSale"
                      checked={productForm.isSale}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Product</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
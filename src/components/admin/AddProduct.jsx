import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../redux/actions/productActions';
import { Save, ArrowLeft } from 'lucide-react';

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    imgUrl: '',
    price: '',
    fabric: '',
    category: '',
    description: '',
    isNewArrival: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const productData = {
      name: formData.name,
      imgUrl: formData.imgUrl,
      price: parseInt(formData.price),
      fabric: formData.fabric,
      category: formData.category,
      description: formData.description,
      isNewArrival: formData.isNewArrival,
    };

    try {
      const response = await dispatch(createProduct(productData));
      if (response.success) {
        navigate('/admin/products');
      } else {
        setError(response.error || 'Failed to create product');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to create product');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-600 mt-1">Create a new product listing</p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Category</option>
                <option value="bridal">Bridal Wear</option>
                <option value="fusion">Fusion Wear</option>
                <option value="occasion">Occasion Wear</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fabric
              </label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g., Silk, Cotton, Georgette"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-slate-300 rounded focus:ring-yellow-500"
            />
            <label className="ml-2 text-sm text-slate-700">
              Mark as New Arrival
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Adding...' : 'Add Product'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

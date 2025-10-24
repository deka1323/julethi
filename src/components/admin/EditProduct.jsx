import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../redux/actions/productActions';
import { Save, ArrowLeft } from 'lucide-react';

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === id || p.productId === id);

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

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        imgUrl: product.imgUrl,
        price: product.price.toString(),
        fabric: product.fabric,
        category: product.category,
        description: product.description,
        isNewArrival: product.isNewArrival,
      });
    }
  }, [product]);

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

    try {
      const productId = product.productId || product.id;
      const response = await dispatch(
        updateProduct(productId, {
          ...formData,
          price: parseInt(formData.price),
        })
      );

      if (response.success) navigate('/admin/products');
      else {
        setError(response.error || 'Failed to update product');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to update product');
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            Edit Product
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Make updates to product details
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-slate-600 hover:text-slate-800 transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 placeholder-slate-400 text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 text-sm"
              >
                <option value="">Select Category</option>
                <option value="bridal">Bridal Wear</option>
                <option value="fusion">Fusion Wear</option>
                <option value="occasion">Occasion Wear</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 placeholder-slate-400 text-sm"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1.5 font-medium">
                Fabric
              </label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 placeholder-slate-400 text-sm"
                placeholder="e.g., Silk, Cotton, Georgette"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1.5 font-medium">
              Image URL
            </label>
            <input
              type="url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 placeholder-slate-400 text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1.5 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-slate-700 placeholder-slate-400 text-sm"
              placeholder="Enter product description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-slate-300 rounded focus:ring-yellow-400"
            />
            <label className="text-slate-600 font-medium text-sm">
              Mark as New Arrival
            </label>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-slate-900 py-2.5 rounded-lg font-medium hover:bg-yellow-500 transition flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Updating...' : 'Update Product'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

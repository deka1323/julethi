import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../redux/actions/productActions";
import { ArrowLeft, Save, X, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === id || p.productId === id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    fabric: "",
    category: "",
    description: "",
    isNewArrival: false,
  });

  // 🟡 Product Details Array (with editable inputs)
  const [productDetails, setProductDetails] = useState([
    "Handcrafted with premium materials",
    "Perfect for special occasions",
    "Customization available",
    "Dry clean only",
  ]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        discountedPrice: product.discountedPrice?.toString(),
        fabric: product.fabric,
        category: product.category,
        description: product.description,
        isNewArrival: product.isNewArrival,
      });
      // If productDetails exist in DB, use them
      if (product.productDetails && Array.isArray(product.productDetails)) {
        setProductDetails(product.productDetails);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔸 Product Details Handlers
  const handleDetailChange = (index, value) => {
    const updated = [...productDetails];
    updated[index] = value;
    setProductDetails(updated);
  };

  const handleAddDetail = () => setProductDetails([...productDetails, ""]);

  const handleRemoveDetail = (index) => {
    setProductDetails(productDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productId = product.productId || product.id;

      const updatedData = {
        ...formData,
        price: parseInt(formData.price),
        discountedPrice: parseInt(formData.discountedPrice),
        productDetails: productDetails.filter((d) => d.trim() !== ""),
      };


      const response = await dispatch(updateProduct(productId, updatedData));
      console.log("response after editing : ", response)

      if (response.success) {
        toast.success("✅ Product updated successfully!");
        navigate("/admin/products");
      } else {
        setError(response.error || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update product");
    } finally {
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
          <p className="text-xs text-slate-500 mt-1">
            Make updates to product details
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-slate-600 hover:text-slate-800 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* Product Name + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-600 mb-1 block text-xs font-medium">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-600 mb-1 block text-xs font-medium">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
              >
                <option value="">Select Category</option>
                <option value="bridal">Bridal Wear</option>
                <option value="mensWear">Mens Wear</option>
                <option value="occasion">Occasion Wear</option>
                <option value="houseOfLuit">House of Luit</option>
              </select>
            </div>
          </div>

          {/* Price + Fabric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-600 mb-1 block text-xs font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter price"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-600 mb-1 block text-xs font-medium">
                Discounted Price (₹)
              </label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                required
                placeholder="Enter discounted price"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-600 mb-1 block text-xs font-medium">
                Fabric
              </label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                required
                placeholder="Ex: Silk, Cotton"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
              />
            </div>
          </div>

          {/* 🟡 Product Details */}
          <div>
            <label className="text-slate-600 mb-2 block text-xs font-medium">
              Product Details
            </label>
            <div className="space-y-2">
              {productDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => handleDetailChange(index, e.target.value)}
                    placeholder="Enter product detail"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddDetail}
                className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-xs font-medium mt-1"
              >
                <PlusCircle className="w-4 h-4" />
                Add More
              </button>
            </div>
          </div>

          {/* 🖼️ View-only Images */}
          <div>
            <label className="text-slate-600 mb-2 block text-xs font-medium">
              Product Images
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {product.images?.length > 0 ? (
                product.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 border border-slate-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`Product ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No images available</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-slate-600 mb-1 block text-xs font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              placeholder="Enter product description..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-slate-300 rounded"
            />
            <label className="text-xs text-slate-700">Mark as New Arrival</label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-500 text-slate-900 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-600 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

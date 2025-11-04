import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/productActions";
import { Save, ArrowLeft, GripVertical, X, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

function generateProductId(category) {
  const prefixMap = { bridal: "BR", fusion: "FS", occasion: "OC" };
  const prefix = prefixMap[category] || "PR";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productDetails, setProductDetails] = useState([
    "Handcrafted with premium materials",
    "Perfect for special occasions",
    "Customization available",
    "Dry clean only",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    fabric: "",
    category: "",
    description: "",
    isNewArrival: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file, index) => ({
      id: Date.now() + "-" + index,
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
  };

  const handleDetailChange = (index, value) => {
    const updated = [...productDetails];
    updated[index] = value;
    setProductDetails(updated);
  };

  const handleAddDetail = () => {
    setProductDetails([...productDetails, ""]);
  };

  const handleRemoveDetail = (index) => {
    const updated = productDetails.filter((_, i) => i !== index);
    setProductDetails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productId = generateProductId(formData.category);
      const filesData = images.map((img, index) => ({
        fileType: img.file.type,
        order: index + 1,
      }));

      const res = await fetch(`${API_BASE_URL}/getUploadUrl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: formData.category,
          productId,
          files: filesData,
        }),
      });

      const { uploads } = await res.json();

      const publicUrls = await Promise.all(
        uploads.map(async (upload, index) => {
          const { uploadURL, publicUrl } = upload;
          const imageFile = images[index].file;
          const uploadResp = await fetch(uploadURL, {
            method: "PUT",
            headers: { "Content-Type": imageFile.type },
            body: imageFile,
          });
          if (!uploadResp.ok) throw new Error(`Upload failed for ${publicUrl}`);
          return publicUrl;
        })
      );

      const productData = { ...formData, images: publicUrls, productId };
      console.log("productData : ", productData)
      await dispatch(createProduct(productData));
      toast.success("✅ Product added successfully!");

      setFormData({
        name: "",
        price: "",
        discountedPrice: "",
        fabric: "",
        category: "",
        description: "",
        isNewArrival: false,
      });
      setProductDetails([
        "Handcrafted with premium materials",
        "Perfect for special occasions",
        "Customization available",
        "Dry clean only",
      ]);
      setImages([]);
    } catch (err) {
      console.error(err);
      setError("Failed to upload images or create product.");
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Add New Product</h1>
          <p className="text-xs text-slate-500 mt-1">
            Fill in the details to add a new product
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          {/* Product Fields */}
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
                placeholder="Ex: Elegant Bridal Saree"
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
                <option value="fusion">Fusion Wear</option>
                <option value="occasion">Occasion Wear</option>
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

          {/* Image Upload */}
          <div>
            <label className="text-slate-600 mb-2 block text-xs font-medium">
              Upload Product Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-600"
            />

            {images.length > 0 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-wrap gap-3 mt-4"
                    >
                      {images.map((img, index) => (
                        <Draggable
                          key={img.id}
                          draggableId={img.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="relative w-24 h-24 border border-slate-200 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition"
                            >
                              <img
                                src={img.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-white/80 rounded p-1">
                                <GripVertical className="w-3 h-3 text-slate-600" />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(img.id)}
                                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                              >
                                <X className="w-3 h-3 text-slate-600" />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
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
              required
              rows={3}
              placeholder="Enter product description..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
            />
          </div>

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

          {/* --- Rest of Your Fields (Price, Description, Images etc.) --- */}
          {/* Keep your existing image upload, description, and buttons unchanged */}

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-slate-300 rounded"
            />
            <label className="text-xs text-slate-700">
              Mark as New Arrival
            </label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-500 text-slate-900 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-600 transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Add Product"}
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

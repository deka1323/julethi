import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/productActions";
import { Save, ArrowLeft, GripVertical } from "lucide-react";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

function generateProductId(category) {
  const prefixMap = {
    bridal: "BR",
    fusion: "FS",
    occasion: "OC",
  };
  const prefix = prefixMap[category] || "PR";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

export default function AddProduct() {
  const [images, setImages] = useState([]);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Multiple file upload handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file, index) => ({
      id: Date.now() + "-" + index,
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newFiles]);
  };

  // Drag and drop reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const productId = `TMP${Date.now()}`;
      const productId = generateProductId(formData.category);
      const filesData = images.map((img, index) => ({
        fileType: img.file.type,
        order: index + 1,
      }));

      // Step 1: Get all pre-signed URLs
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

      // Step 2: Upload each image to S3
      const uploadPromises = uploads.map(async (upload, index) => {
        const { uploadURL, publicUrl } = upload;
        const imageFile = images[index].file;

        const uploadResp = await fetch(uploadURL, {
          method: "PUT",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });

        if (!uploadResp.ok) throw new Error(`Upload failed for ${publicUrl}`);
        return publicUrl;
      });

      const publicUrls = await Promise.all(uploadPromises);

      console.log("Public URLs : ", publicUrls)

      // Step 3: Save product in DB
      const productData = {
        ...formData,
        images: publicUrls,
        productId
      };

      console.log("productData : ", productData)

      await dispatch(createProduct(productData));
      toast.success("✅ Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        fabric: "",
        category: "",
        description: "",
        isNewArrival: false,
      });
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Add New Product</h1>
          <p className="text-slate-600 mt-1">Create a new product listing</p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
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
          {/* Product fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="bridal">Bridal Wear</option>
              <option value="fusion">Fusion Wear</option>
              <option value="occasion">Occasion Wear</option>
            </select>
          </div>

          {/* Price + Fabric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              name="fabric"
              value={formData.fabric}
              onChange={handleChange}
              required
              placeholder="Fabric type"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />
          </div>

          {/* Image Upload + Drag and Drop */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload Product Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-700"
            />

            {images.length > 0 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex flex-wrap gap-3 mt-4"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
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
                              className="relative w-28 h-28 border rounded-lg overflow-hidden group"
                            >
                              <img
                                src={img.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-white/80 rounded p-1">
                                <GripVertical className="w-4 h-4 text-slate-600" />
                              </div>
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

          {/* Description + New Arrival */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter product description"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={formData.isNewArrival}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-slate-300 rounded"
            />
            <label className="text-sm text-slate-700">Mark as New Arrival</label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
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

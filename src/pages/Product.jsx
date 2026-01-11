import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProductById } from "../data/products";

const colorMap = {
  "Tan": "#D2B48C",
  "Ivory": "#FFFFF0",
  "Walnut": "#773F1A",
  "Gray": "#A9A9A9",
  "Charcoal": "#444444",
  "Brown": "#8B4513",
  "Black": "#000000"
};

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4 text-gray-900 dark:text-gray-100">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          ← Back
        </button>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:h-[calc(100vh-12rem)]">
          {/* Image Gallery - Left */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-neutral-800">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-800 ${
                    selectedImage === index
                      ? "ring-2 ring-black dark:ring-white"
                      : "opacity-70 hover:opacity-100"
                  } transition-all`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Right */}
          <div className="space-y-8 overflow-y-auto p-6 border border-gray-200 dark:border-neutral-700 rounded-2xl custom-scrollbar">
            {/* Category */}
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-light text-gray-900 dark:text-gray-100">
              {product.price}
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                Dimensions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{product.dimensions}</p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
                Materials
              </h3>
              <ul className="space-y-1">
                {product.materials.map((material, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            {/* Available Colors */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
                Available Colors
              </h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => (
                  <div key={color} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full shadow-sm border border-gray-300 dark:border-neutral-600"
                      style={{ backgroundColor: colorMap[color] || color }}
                    />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="mr-2 text-gray-900 dark:text-gray-100">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
                Specifications
              </h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="font-medium text-gray-900 dark:text-gray-100 capitalize w-40">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-300">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Inquire Button */}
            <button 
              onClick={() => navigate("/contact")}
              className="w-full bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium text-lg"
            >
              Inquire about this product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


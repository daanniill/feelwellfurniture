import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Reset zoom when image changes
  useEffect(() => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }, [selectedImage]);

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
            <div 
              className={`aspect-square overflow-hidden rounded-2xl relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={handleZoomToggle}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isZoomed ? 2.5 : 1,
                    x: isZoomed ? `${(50 - zoomPosition.x) * 1.5}%` : '0%',
                    y: isZoomed ? `${(50 - zoomPosition.y) * 1.5}%` : '0%'
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    opacity: { duration: 0.3, ease: "easeInOut" },
                    scale: { duration: 0.3, ease: "easeInOut" },
                    x: { duration: 0 },
                    y: { duration: 0 }
                  }}
                />
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              {product.images.length > 1 && !isZoomed && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 transition-all shadow-lg flex items-center justify-center text-gray-900 dark:text-gray-100 z-10 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 transition-all shadow-lg flex items-center justify-center text-gray-900 dark:text-gray-100 z-10 cursor-pointer"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-4 sm:overflow-x-auto sm:py-4 sm:justify-center">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square sm:flex-shrink-0 sm:w-32 sm:h-32 overflow-hidden rounded-lg ${
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
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-gilroy-medium">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-gilroy-medium text-gray-900 dark:text-gray-100">
              {product.price}
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                Dimensions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{product.dimensions}</p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
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
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
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
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
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
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
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

            {/* Delivery Information */}
            <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-xl">
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
                Delivery & Returns
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <span className="mr-2 text-gray-900 dark:text-gray-100">•</span>
                  <span>Shipping costs provided upon quote request</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <span className="mr-2 text-gray-900 dark:text-gray-100">•</span>
                  <span>Standard delivery timeframe: 30 business days</span>
                </li>
                <li className="flex items-start text-gray-600 dark:text-gray-300">
                  <span className="mr-2 text-gray-900 dark:text-gray-100">•</span>
                  <span>Comprehensive 30-day return guarantee</span>
                </li>
              </ul>
            </div>

            {/* Inquire Button */}
            <button 
              onClick={() => navigate("/contact")}
              className="w-full bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-gilroy-medium text-lg"
            >
              Inquire about this product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


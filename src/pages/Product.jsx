import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isMetric, setIsMetric] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [pulseKey, setPulseKey] = useState(0);

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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAddedToCart(true);
    setPulseKey(prev => prev + 1); // Increment to trigger new animation
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Reset zoom when image changes
  useEffect(() => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }, [selectedImage]);

  // Convert all measurements between imperial and metric
  const convertMeasurements = (text) => {
    if (!text || !isMetric) return text;
    
    // Convert dimensions (format: "93×83×43in" or "93 x 83 x 43 in")
    text = text.replace(/(\d+)\s*[×x]\s*(\d+)\s*[×x]\s*(\d+)\s*in/gi, (match, w, d, h) => {
      const widthCm = Math.round(parseInt(w) * 2.54);
      const depthCm = Math.round(parseInt(d) * 2.54);
      const heightCm = Math.round(parseInt(h) * 2.54);
      return `${widthCm}×${depthCm}×${heightCm}cm`;
    });
    
    // Convert single measurements like "12in" or "12 in" or "12 inches"
    text = text.replace(/(\d+\.?\d*)\s*(in|inch|inches)\b/gi, (match, num) => {
      const cm = Math.round(parseFloat(num) * 2.54);
      return `${cm}cm`;
    });
    
    // Convert weight (lbs to kg)
    text = text.replace(/(\d+\.?\d*)\s*(lb|lbs|pound|pounds)\b/gi, (match, num) => {
      const kg = (parseFloat(num) * 0.453592).toFixed(1);
      return `${kg}kg`;
    });
    
    return text;
  };

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
    <div className="min-h-screen py-16 px-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          ← Back
        </button>
        
        <div className="grid lg:grid-cols-2 gap-12">
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
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-4 sm:overflow-x-auto sm:py-4 sm:justify-center custom-scrollbar">
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
          <div className="space-y-8 lg:h-[calc(100vw/2.2+8rem)] lg:overflow-y-auto p-6 pb-8 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-lg custom-scrollbar">
            {/* Header with Category and Unit Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-gilroy-medium">
                {product.category}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-gilroy-medium text-gray-600 dark:text-gray-300">
                  {isMetric ? 'Metric' : 'Imperial'}
                </span>
                <button
                  onClick={() => setIsMetric(!isMetric)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isMetric ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-neutral-600'
                  }`}
                  aria-label="Toggle unit system"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                      isMetric 
                        ? 'translate-x-6 bg-white dark:bg-black' 
                        : 'translate-x-1 bg-white dark:bg-neutral-300'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-gilroy-medium text-gray-900 dark:text-gray-100">
              {product.price}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
                Select Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-black dark:ring-white bg-gray-100 dark:bg-neutral-700'
                        : 'hover:bg-gray-50 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full shadow-sm border-2 border-gray-300 dark:border-neutral-600"
                      style={{ backgroundColor: colorMap[color] || color }}
                    />
                    <p className="text-sm font-gilroy-medium text-gray-600 dark:text-gray-300">{color}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex flex-col gap-3 items-start">
              {/* Add to Cart Button */}
              <div className="relative w-full sm:w-[200px]">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  whileTap={!addedToCart ? { scale: 0.95 } : {}}
                  className={`relative w-full px-8 py-3 rounded-lg font-gilroy-medium transition-all duration-300 ${
                    addedToCart 
                      ? 'bg-green-600 dark:bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  <motion.span
                    key={addedToCart ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </motion.span>
                </motion.button>
                
                {/* Pulsating Ring Effect */}
                <AnimatePresence>
                  {addedToCart && (
                    <motion.div
                      key={pulseKey}
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.25, opacity: 0 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 rounded-lg border-4 border-green-500 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Quantity Selector - Smaller and below button */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-gilroy-medium text-gray-600 dark:text-gray-400">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-neutral-600 rounded">
                  <button
                    onClick={decrementQuantity}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-neutral-700 transition font-gilroy-medium text-sm text-gray-900 dark:text-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 border-x border-gray-300 dark:border-neutral-600 font-gilroy-medium text-sm text-gray-900 dark:text-gray-100 min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-neutral-700 transition font-gilroy-medium text-sm text-gray-900 dark:text-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                Dimensions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{convertMeasurements(product.dimensions)}</p>
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


            {/* Key Features */}
            <div>
              <h3 className="text-lg font-gilroy-medium mb-3 text-gray-900 dark:text-gray-100">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                    <span className="mr-2 text-gray-900 dark:text-gray-100">✓</span>
                    {convertMeasurements(feature)}
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
                    <dd className="text-gray-600 dark:text-gray-300">{convertMeasurements(value)}</dd>
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


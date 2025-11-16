import { useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { products } from "../data/products";

const colorMap = {
  "Tan": "#D2B48C",
  "Ivory": "#FFFFF0",
  "Walnut": "#773F1A",
  "Gray": "#A9A9A9",
  "Charcoal": "#444444",
  "Brown": "#8B4513",
  "Black": "#000000"
};

const featuredItems = products.slice(0, 3);

export default function FeaturedCollection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -50px 0px" });

  return (
    <section
      ref={ref}
      className={`py-20 px-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12 text-gray-900 dark:text-gray-100">
          Featured Collection
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {featuredItems.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden ${
                isInView ? `animate-fade-in animate-delay-${index + 1}` : ''
              }`}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-6">
                {/* Category */}
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                
                {/* Title */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3 hover:underline">
                    {product.title}
                  </h3>
                </Link>
                
                {/* Material */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Material:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.materials[0]}
                  </p>
                </div>
                
                {/* Colors */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Colors:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center gap-1.5"
                        title={color}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-neutral-600 shadow-sm"
                          style={{ backgroundColor: colorMap[color] || color }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price */}
                <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                  {product.price}
                </p>
                
                {/* Buy Link */}
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline transition-colors"
                >
                  Buy Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/collection"
            className="inline-block bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-medium"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
}


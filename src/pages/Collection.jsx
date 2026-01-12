import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Beds", "Sofas"];
  
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="px-8 py-16">
      <h2 className="text-3xl font-gilroy-extrabold text-center mb-10 text-gray-900 dark:text-gray-100">
        Our Collection
      </h2>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-gilroy-medium transition-all ${
              activeCategory === category
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
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
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 font-gilroy-medium">
                {product.category}
              </p>
              
              {/* Title */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-3 hover:underline">
                  {product.title}
                </h3>
              </Link>
              
              {/* Material */}
              <div className="mb-3">
                <p className="text-xs font-gilroy-medium text-gray-700 dark:text-gray-300 mb-1">
                  Material:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.materials[0]}
                </p>
              </div>
              
              {/* Colors */}
              <div className="mb-4">
                <p className="text-xs font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <p className="text-2xl font-gilroy-medium text-gray-900 dark:text-gray-100 mb-4">
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
    </div>
  );
}
  
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  // Helper function to safely parse price
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') return parseFloat(price.replace('$', ''));
    return 0;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-gilroy-regular mb-8">
            Add some beautiful furniture to your cart to get started!
          </p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-gilroy-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-8">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.color || 'default'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 flex gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-lg bg-white dark:bg-neutral-700"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-gilroy-regular">
                    {item.category}
                  </p>
                  {item.color && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-gilroy-regular mb-2">
                      Color: {item.color}
                    </p>
                  )}
                  <p className="text-lg font-gilroy-extrabold text-gray-900 dark:text-gray-100 mt-2">
                    ${parsePrice(item.price).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id, item.color)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-gilroy-medium transition"
                  >
                    Remove
                  </button>

                  <div className="flex items-center gap-2 border border-gray-300 dark:border-neutral-600 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.color)}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-l-lg transition font-gilroy-medium"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 font-gilroy-medium text-gray-900 dark:text-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.color)}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-r-lg transition font-gilroy-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-gilroy-regular">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-gray-100">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-gilroy-regular">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-gray-100">TBD</span>
                </div>
                <div className="border-t border-gray-300 dark:border-neutral-600 pt-3">
                  <div className="flex justify-between font-gilroy-extrabold text-lg">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-gray-900 dark:text-gray-100">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-gilroy-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/collection')}
                className="w-full border border-gray-300 dark:border-neutral-600 py-3 rounded-lg font-gilroy-medium hover:bg-gray-100 dark:hover:bg-neutral-700 transition text-gray-900 dark:text-gray-100"
              >
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-neutral-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-gilroy-regular text-center">
                  Shipping costs will be calculated during checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

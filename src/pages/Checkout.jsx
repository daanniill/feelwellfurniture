import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Helper function to safely parse price
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') return parseFloat(price.replace('$', ''));
    return 0;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Format cart data for Fillout
      const cartData = cart.map((item) => {
        const price = parsePrice(item.price);
        return {
          name: item.title,
          color: item.color || 'Not specified',
          price: price,
          quantity: item.quantity,
          subtotal: (price * item.quantity).toFixed(2),
        };
      });

      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;

      // Get field IDs from environment variables
      // These must be set in your .env file - get them from your Fillout form
      const fieldIds = {
        fullName: process.env.REACT_APP_FILLOUT_FIELD_FULLNAME || '',
        email: process.env.REACT_APP_FILLOUT_FIELD_EMAIL || '',
        phone: process.env.REACT_APP_FILLOUT_FIELD_PHONE || '',
        address: process.env.REACT_APP_FILLOUT_FIELD_ADDRESS || '',
        notes: process.env.REACT_APP_FILLOUT_FIELD_NOTES || '',
        cart: process.env.REACT_APP_FILLOUT_FIELD_CART || '',
        total: process.env.REACT_APP_FILLOUT_FIELD_TOTAL || '',
      };

      // Validate that all field IDs are set
      const missingFields = Object.entries(fieldIds)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing Fillout field IDs in .env: ${missingFields.join(', ')}. Please check FILLOUT_SETUP.md for instructions.`);
      }

      // Prepare payload for Fillout API
      const payload = {
        submissions: [
          {
            questions: [
              { id: fieldIds.fullName, value: formData.fullName },
              { id: fieldIds.email, value: formData.email },
              { id: fieldIds.phone, value: formData.phone },
              { id: fieldIds.address, value: fullAddress },
              { id: fieldIds.notes, value: formData.notes || 'No special notes' },
              { id: fieldIds.cart, value: JSON.stringify(cartData) },
              { id: fieldIds.total, value: `$${getTotalPrice().toFixed(2)}` },
            ],
          },
        ],
      };

      console.log('Submitting to Fillout with field IDs:', fieldIds);

      // Send to Fillout API
      const response = await fetch(
        `https://api.fillout.com/v1/api/forms/${process.env.REACT_APP_FILLOUT_FORM_ID}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_FILLOUT_API_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Fillout API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(JSON.stringify(errorData) || 'Failed to submit order. Please try again.');
      }

      // Success!
      setSubmitSuccess(true);
      clearCart();

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Order submission error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !submitSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-gilroy-regular mb-8">
            Add some items to your cart before checking out.
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-12"
          >
            <div className="text-6xl mb-6">✓</div>
            <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-4">
              Order Submitted Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-gilroy-regular mb-6">
              Thank you for your order. We'll contact you shortly with a quote and delivery details.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-gilroy-regular">
              Redirecting to home page...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6">
                <h2 className="text-2xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
                  Contact Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6">
                <h2 className="text-2xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6">
                <h2 className="text-2xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
                  Special Instructions
                </h2>

                <div>
                  <label className="block text-sm font-gilroy-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any special delivery instructions or questions..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 font-gilroy-regular"
                  />
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-400 font-gilroy-medium">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-gilroy-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color || 'default'}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-neutral-700"
                    />
                    <div className="flex-1">
                      <p className="font-gilroy-medium text-sm text-gray-900 dark:text-gray-100">
                        {item.title}
                      </p>
                      {item.color && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-gilroy-regular">
                          Color: {item.color}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-gilroy-regular">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-gilroy-medium text-gray-900 dark:text-gray-100">
                        ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 dark:border-neutral-600 pt-4 space-y-2">
                <div className="flex justify-between font-gilroy-regular">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-gray-100">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-gilroy-regular">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-gray-100">TBD</span>
                </div>
                <div className="border-t border-gray-300 dark:border-neutral-600 pt-2 mt-2">
                  <div className="flex justify-between font-gilroy-extrabold text-lg">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-gray-900 dark:text-gray-100">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-neutral-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-gilroy-regular">
                  * Final price includes shipping costs to be calculated and confirmed via quote
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

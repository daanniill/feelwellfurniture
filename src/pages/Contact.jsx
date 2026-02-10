import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        submissions: [
          {
            questions: [
              { id: process.env.REACT_APP_FILLOUT_CONTACT_FIELD_NAME, value: formData.name },
              { id: process.env.REACT_APP_FILLOUT_CONTACT_FIELD_EMAIL, value: formData.email },
              { id: process.env.REACT_APP_FILLOUT_CONTACT_FIELD_PHONE, value: formData.phone || 'Not provided' },
              { id: process.env.REACT_APP_FILLOUT_CONTACT_FIELD_SUBJECT, value: formData.subject },
              { id: process.env.REACT_APP_FILLOUT_CONTACT_FIELD_MESSAGE, value: formData.message },
            ],
          },
        ],
      };

      // Send to our secure serverless function (which calls Fillout)
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Contact submission error:', errorData);
        throw new Error(errorData.error || 'Failed to submit message. Please try again.');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 2 seconds
      setTimeout(() => setSubmitSuccess(false), 2000);
    } catch (error) {
      console.error('Message submission error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fullscreen Success Message */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl p-12 shadow-2xl border-4 border-green-500 max-w-md mx-4"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl mb-6"
                >
                  ✓
                </motion.div>
                <h3 className="text-3xl font-gilroy-extrabold text-gray-900 dark:text-gray-100 mb-4">
                  Message Sent!
                </h3>
                <p className="text-lg font-gilroy-medium text-green-600 dark:text-green-400">
                  We'll get back to you soon.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-gilroy-extrabold mb-4 text-gray-900 dark:text-gray-100">
              Get in Touch
            </h2>
            <p className="font-gilroy-regular text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a question or want to learn more about our furniture? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-gilroy-extrabold mb-6 text-gray-900 dark:text-gray-100">
                Send us a Message
              </h3>

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-lg">
                <p className="text-red-700 dark:text-red-300 font-gilroy-medium">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Phone <span className="text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black dark:bg-white dark:text-black text-white py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-gilroy-medium mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-gilroy-extrabold mb-6 text-gray-900 dark:text-gray-100">
              Contact Information
            </h3>
            <p className="font-gilroy-regular text-gray-600 dark:text-gray-300 mb-8">
              Reach out to us through any of these channels. We're here to help!
            </p>

            <div className="space-y-6 mb-10">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">Phone</p>
                  <a
                    href="tel:+18589770784"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    +1 (858) 977-0784
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">Email</p>
                  <a
                    href="mailto:contact@feelwellfurniture.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    contact@feelwellfurniture.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">Address</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=La+Jolla,+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    La Jolla, CA
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-lg font-gilroy-medium mb-4 text-gray-900 dark:text-gray-100">
                Business Hours
              </h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
  
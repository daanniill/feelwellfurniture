export default function Contact() {
  return (
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
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Phone <span className="text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="What is this regarding?"
                  required
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-gilroy-medium mb-2 text-gray-900 dark:text-gray-100">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                  className="w-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="bg-black dark:bg-white dark:text-black text-white py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-gilroy-medium mt-2"
              >
                Send Message
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
                    href="tel:888-888-8888"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    888-888-8888
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">Email</p>
                  <a
                    href="mailto:sample@gmail.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    sample@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-gilroy-medium text-gray-900 dark:text-gray-100 mb-1">Address</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=San+Francisco,+California"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    San Francisco, California
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
  );
}
  
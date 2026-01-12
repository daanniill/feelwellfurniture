export default function Reviews() {
  const reviews = [
    {
      stars: 5,
      text: "Absolutely love my new sofa! The quality is outstanding and it looks perfect in my living room.",
      name: "Sarah Johnson",
      location: "New York"
    },
    {
      stars: 5,
      text: "The dining table exceeded my expectations. Beautiful craftsmanship and excellent customer service.",
      name: "Michael Chen",
      location: "California"
    },
    {
      stars: 5,
      text: "Fast delivery and easy assembly. The bedroom set is exactly what I was looking for.",
      name: "Emily Rodriguez",
      location: "Texas"
    }
  ];

  return (
    <div className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-gilroy-extrabold text-center mb-12 text-gray-900 dark:text-gray-100">
          Customer Reviews
        </h2>
        
        <div className="space-y-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <p className="font-gilroy-regular text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex flex-col">
                <p className="font-gilroy-medium text-gray-900 dark:text-gray-100">
                  {review.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Truck, Shield, Palette } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "All our furniture is crafted from the finest materials",
    iconColor: "text-yellow-500"
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery and setup service",
    iconColor: "text-blue-500"
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive warranty on all products",
    iconColor: "text-green-500"
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Personalized furniture solutions for your space",
    iconColor: "text-purple-500"
  }
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -50px 0px" });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-8 bg-gray-50 dark:bg-neutral-800"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Excellence in every detail
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-neutral-700 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: index * 0.1
                }}
              >
                <div className="flex justify-center mb-4">
                  <IconComponent 
                    size={48} 
                    className={feature.iconColor}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}


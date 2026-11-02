import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer, California',
      content:
        'TaxFiling made the entire process so smooth. As an NRI, I was worried about compliance, but they handled everything perfectly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Doctor, New York',
      content:
        'Professional service from start to finish. The team was responsive, knowledgeable, and helped me save on taxes. Worth every penny.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'Business Owner, Texas',
      content:
        'I\'ve been using TaxFiling for 3 years now. They understand the complexities of dual-country taxation and always deliver on time.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      role: 'Investment Banker, New York',
      content:
        'The consultation call was incredibly helpful. They explained everything clearly and helped me optimize my tax situation. Excellent service!',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-blue/5 to-purple-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of global Indians for their tax filing needs
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl"
            >
              <div className="flex mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-6 w-6 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              <div>
                <p className="font-bold text-primary-navy text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-gray-500">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-blue w-8'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

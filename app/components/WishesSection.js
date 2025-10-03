'use client';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

export default function WishesSection() {
  return (
    // UPDATED: Changed bg-white to bg-gray-900, text-text-dark to text-gray-300
    <section className="py-20 md:py-32 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          // UPDATED: Card background to dark
          className="p-8 md:p-12 bg-primary-purple/10 rounded-3xl shadow-xl border border-primary-purple/30"
        >
          <h2 className="text-4xl md:text-5xl font-dancing text-primary-pink text-center mb-6">
            A Message From My Heart
          </h2>
          <p className="text-lg md:text-xl font-poppins text-gray-300 leading-relaxed italic">
            &quot;In these three years, we’ve celebrated smiles, shared adventures, and faced the toughest days together. You’ve shown me strength, love, and resilience beyond words. Today, I celebrate not just your birthday, but the amazing woman you are. You make my life complete, and I fall in love with you more every single day.&quot;
          </p>
          <div className="mt-8 text-right">
            <p className="text-2xl font-dancing text-primary-pink">- Your Kelvin ❤️</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
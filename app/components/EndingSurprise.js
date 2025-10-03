'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function EndingSurprise({ isOpen, onClose }) {

  if (!isOpen) {
    return null;
  }

  const modalVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: "0",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 100 }
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    // FULL-SCREEN OVERLAY: Click anywhere here closes the modal
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      {/* MODAL CONTENT CONTAINER */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} // Stops click inside the box from closing the modal
        className="relative w-full max-w-2xl mx-auto bg-gray-800 text-gray-200 rounded-2xl shadow-2xl p-8 border-4 border-secondary-gold overflow-y-auto max-h-[90vh]" // Increased max-w and added scrolling for long text
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-primary-pink hover:scale-110 transition"
          aria-label="Close Surprise"
        >
          &times;
        </button>

        <h3 className="text-4xl font-dancing text-center text-primary-pink mb-6">
          Happy Birthday MoonPie! 💖
        </h3>

        {/* ============================================== */}
        {/* NEW LONGWINDED ROMANTIC MESSAGE SECTION */}
        {/* ============================================== */}
        <div className="text-center font-poppins text-lg leading-relaxed text-gray-300">
          <p className="mb-6 italic">
            My dearest love, as you reach the end of this journey through our shared memories,
            know that this website—every photo, every quote, every star—is just a mirror reflecting the immense light you bring to my life.
            The greatest gift is not one I can wrap, but the one you gave me three years ago when you chose to be mine.
          </p>

          <p className="mb-6">
            Looking back, I see a tapestry woven with late-night laughs, quiet comforts, and the kind of understanding that transcends words.
            You are my constant, my adventure, and the soft landing I always need. Each new year with you is simply the best year of my life,
            and I am endlessly grateful for the privilege of watching you grow, thrive, and shine.
          </p>

          <p className="mb-6 font-semibold text-secondary-gold">
            This birthday marks not just a passing year, but the beautiful promise of all the adventures yet to come.
            May your day overflow with joy, and may you feel the depth of my love in every moment.
            Thank you for being everything I never knew I was looking for. I love you more than words can say.
          </p>

          <p className="text-xl font-dancing mt-8 text-primary-pink">
            All my love, forever and always.
          </p>
        </div>
        {/* ============================================== */}

      </motion.div>
    </motion.div>
  );
}
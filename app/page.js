'use client';
import { useRef, useState, useEffect } from 'react'; // Keep useState/useEffect for music logic
import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection'; // Standard import
import WishesSection from './components/WishesSection';
import { AnimatePresence } from 'framer-motion';
// import MemoryTimeline from './components/MemoryTimeline';
// import EndingSurprise from './components/EndingSurprise';
import ParticlesBackground from './components/ParticlesBackground'; // Standard import
// import QuotesScroller from './components/QuotesScroller';


// We keep the dynamic import ONLY for the MusicPlayer as it is a global fixed audio element
const MusicPlayer = dynamic(() => import('./components/MusicPlayer'), {
  ssr: false,
});

const ImageGallery = dynamic(() => import('./components/ImageGallery'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-800 flex items-center justify-center text-gray-500">Loading Memories...</div>,
});

const QuotesScroller = dynamic(() => import('./components/QuotesScroller'), {
  ssr: false,
});

const MemoryTimeline = dynamic(() => import('./components/MemoryTimeline'), {
  ssr: false,
});

const EndingSurprise = dynamic(() => import('./components/EndingSurprise'), {
  ssr: false,
});

export default function Home() {
  const contentRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false); // Used for both music AND scroll lock
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Scroll/Click Handler (Called by the button)
  const handleStart = () => {
    setHasInteracted(true);
    // The scroll lock will be removed because hasInteracted is true.

    // Optional: Only scroll if the user clicks the button, not when scrolling starts.
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // 2. Interaction Listeners (mousedown/touchstart) remain the same
  useEffect(() => {
    const unlockMedia = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    // ... (rest of the useEffect to attach and remove mousedown/touchstart listeners) ...
    if (!hasInteracted) {
        if (typeof window !== 'undefined') {
          // Listeners are attached here
          document.addEventListener('mousedown', unlockMedia);
          document.addEventListener('touchstart', unlockMedia);
        }
    }

    return () => {
        if (typeof window !== 'undefined') {
          // Listeners are removed here
          document.removeEventListener('mousedown', unlockMedia);
          document.removeEventListener('touchstart', unlockMedia);
        }
    };
  }, [hasInteracted]);


  // Determine the CSS class for the body/content wrapper
  // If the user hasn't interacted, apply 'scroll-locked'
  const scrollLockClass = hasInteracted ? '' : 'scroll-locked';

  return (
    <main className={scrollLockClass}> {/* <-- APPLY CLASS HERE */}
      {/* 1. Landing Page (Hero) */}
      <HeroSection
        scrollRef={contentRef}
        ParticlesBackground={ParticlesBackground}
        onStart={handleStart} // Button calls handleStart
      />

      {/* 2. Main Content Sections */}
      <div ref={contentRef} className="pt-1">
        <WishesSection />
        <ImageGallery />
        <QuotesScroller />
        <MemoryTimeline />

        {/* ADD A BUTTON TO OPEN THE MODAL HERE */}
        <div className='relative overflow-hidden pt-20 pb-40 text-center'>
            <ParticlesBackground type="stars" />

            <h3 className="relative z-10 text-3xl font-dancing text-primary-pink mb-8">
                Ready for the final surprise?
            </h3>
            <button
                onClick={() => setIsModalOpen(true)} // <-- OPEN HANDLER
                // NEW STYLING: Gold background, deeper shadow, pulsing animation effect
                className="relative z-10 px-10 py-4 bg-secondary-gold text-gray-900 font-poppins text-xl font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-primary-pink/80 animate-pulse-slow"
            >
                Unwrap Your Final Gift 🎁
            </button>

            {/* The EndingSurprise component is now rendered outside the static flow */}
            {/* EndingSurprise component is now rendered outside the static flow */}
        </div>
      </div>

      <MusicPlayer autoPlay={hasInteracted} />

      {/* FINAL STEP: Render the modal outside the main flow */}
      <AnimatePresence>
        {isModalOpen && (
          <EndingSurprise
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} // <-- CLOSE HANDLER
          />
        )}
      </AnimatePresence>


      {/* 3. Global Elements - Only MusicPlayer remains dynamically loaded */}
      <MusicPlayer autoPlay={hasInteracted} />
    </main>
  );
}
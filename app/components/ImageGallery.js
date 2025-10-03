'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// --- CONFIGURATION ---
// CRITICAL UPDATE: Increased total items to 80 (4 years * 20 photos/year)
const TOTAL_ITEMS = 80;
const MEDIA_FOLDER = '/birthday-photos/';
// NOTE: Adjust VIDEO_INDICES if you have more than two videos now (e.g., [23, 37, 55, 71])
const VIDEO_INDICES = [12, 36];
const IMAGE_CHANGE_INTERVAL_MS = 3500;
const FADE_DURATION_S = 0.8;

// --- 1. PREPARE MEDIA DATA & CATEGORIZATION ---
const mediaItems = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
  const fileIndex = i + 1;
  // NOTE: You must update VIDEO_INDICES if you add new video files
  const isVideo = VIDEO_INDICES.includes(fileIndex);
  const extension = isVideo ? 'mp4' : 'jpg';

  return {
    id: fileIndex,
    src: `${MEDIA_FOLDER}${fileIndex}.${extension}`,
    alt: `Our Memory Item ${fileIndex}`,
    isVideo: isVideo,
  };
});

// --- 2. CATEGORIZE AND SPLIT IMAGES BY YEAR ---
// New calculation: 80 total images / 4 years = 20 images per year
const IMAGES_PER_YEAR = TOTAL_ITEMS / 4; // 20 images
// Each year is split into two sets (A and B) for the diagonal display
const IMAGES_PER_YEAR_SET = IMAGES_PER_YEAR / 2; // 10 images per set

const yearGalleriesData = [
  {
    year: '2022',
    title: 'The Beginning',
    // Set A (Top-Right): Images 1-10
    imagesA: mediaItems.slice(0, IMAGES_PER_YEAR_SET),
    // Set B (Bottom-Left): Images 11-20
    imagesB: mediaItems.slice(IMAGES_PER_YEAR_SET, IMAGES_PER_YEAR_SET * 2),
  },
  {
    year: '2023',
    title: 'Flourishing Bonds',
    // Set A: Images 21-30
    imagesA: mediaItems.slice(IMAGES_PER_YEAR_SET * 2, IMAGES_PER_YEAR_SET * 3),
    // Set B: Images 31-40
    imagesB: mediaItems.slice(IMAGES_PER_YEAR_SET * 3, IMAGES_PER_YEAR_SET * 4),
  },
  {
    year: '2024',
    title: 'Golden Chapters',
    // Set A: Images 41-50
    imagesA: mediaItems.slice(IMAGES_PER_YEAR_SET * 4, IMAGES_PER_YEAR_SET * 5),
    // Set B: Images 51-60
    imagesB: mediaItems.slice(IMAGES_PER_YEAR_SET * 5, IMAGES_PER_YEAR_SET * 6),
  },
  {
    year: '2025',
    title: 'Radiant Horizons',
    // Set A: Images 61-70
    imagesA: mediaItems.slice(IMAGES_PER_YEAR_SET * 6, IMAGES_PER_YEAR_SET * 7),
    // Set B: Images 71-80
    imagesB: mediaItems.slice(IMAGES_PER_YEAR_SET * 7, TOTAL_ITEMS),
  },
];

// --- 3. REUSABLE YearGallery COMPONENT (No Change to Logic/Styling) ---
const YearGallery = ({ year, title, imagesA, imagesB }) => {
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(0);

  useEffect(() => {
    // --- Timer for Set A (Top-Right Image) ---
    const intervalA = setInterval(() => {
      setIndexA((prevIndex) => (prevIndex + 1) % imagesA.length);
    }, IMAGE_CHANGE_INTERVAL_MS);

    // --- Timer for Set B (Bottom-Left Image) ---
    const intervalB = setInterval(() => {
      setIndexB((prevIndex) => (prevIndex + 1) % imagesB.length);
    }, IMAGE_CHANGE_INTERVAL_MS + (IMAGE_CHANGE_INTERVAL_MS / 2));

    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
    };
  }, [imagesA.length, imagesB.length]); // Length dependency ensures logic updates with new photo count

  const currentMediaA = imagesA[indexA];
  const currentMediaB = imagesB[indexB];

  // Helper function to render a single image slot
  const renderImageSlot = (media, position) => {
    if (!media) return null;

    const positionClasses = position === 'TR'
      ? 'top-0 right-0'
      : 'bottom-0 left-0';

    const sizeClasses = 'w-1/2 h-1/2 md:w-2/3 md:h-2/3';

    return (
      <div
        className={`absolute ${positionClasses} ${sizeClasses} overflow-hidden rounded-xl shadow-lg border-2 border-white/50 z-10`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={media.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {media.isVideo ? (
              <video
                src={media.src}
                title={media.alt}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                sizes="50vw"
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-xl bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] group">

      {/* 1. Top-Left Text Slot (Year) - Adjacent to Top-Right Image */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 md:w-1/3 md:h-1/3 flex items-center justify-center p-2 z-0">
          <h3 className="text-5xl md:text-6xl font-mono text-primary-pink transition-transform duration-500 group-hover:scale-105 text-glow-pink">
              {year}
          </h3>
      </div>

      {/* 2. Bottom-Right Text Slot (Title) - Adjacent to Bottom-Left Image */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 md:w-1/3 md:h-1/3 flex items-center justify-center p-2 z-0">
          <p className="text-lg md:text-xl font-poppins text-secondary-gold transition-transform duration-500 group-hover:scale-105 text-glow-gold">
              {title}
          </p>
      </div>

      {/* 3. Dynamic Image Slots */}
      {renderImageSlot(currentMediaA, 'TR')}
      {renderImageSlot(currentMediaB, 'BL')}

    </div>
  );
};

// --- 4. MAIN IMAGE GALLERY COMPONENT ---
export default function ImageGallery() {
  return (
    <section className="py-20 md:py-32 bg-gray-900 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-dancing text-primary-pink text-center mb-16">
          A Journey Through Our Years
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {yearGalleriesData.map((data) => (
            <YearGallery
              key={data.year}
              year={data.year}
              title={data.title}
              imagesA={data.imagesA}
              imagesB={data.imagesB}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Note: Removed useState, useEffect, and AnimatePresence as they are no longer needed.

// --- CONFIGURATION ---
const TOTAL_ITEMS = 40;
const MEDIA_FOLDER = '/birthday-photos/';
const VIDEO_INDICES = [23, 37]; // Indices of video files
const ITEM_WIDTH_PX = 280; // Width of each photo item (w-64 is 256px + margin)
const SCROLL_DURATION_S = 90; // Scroll speed (90 seconds for a slow, continuous loop)
// ---------------------

// Generate the array of 40 media objects automatically
const mediaItems = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
  const fileIndex = i + 1;
  const isVideo = VIDEO_INDICES.includes(fileIndex);
  const extension = isVideo ? 'mp4' : 'jpg';

  return {
    src: `${MEDIA_FOLDER}${fileIndex}.${extension}`,
    alt: `Our Memory Item ${fileIndex}`,
    isVideo: isVideo,
    isPriority: fileIndex <= 4, // Prioritize the first few images for faster loading
  };
});

// 1. Divide media into two halves for two rows
const ROW_1_ITEMS = mediaItems.slice(0, TOTAL_ITEMS / 2); // Items 1-20
const ROW_2_ITEMS = mediaItems.slice(TOTAL_ITEMS / 2); // Items 21-40

// 2. Prepare scrolling arrays (duplicated for seamless loop)
const scrollingRow1 = [...ROW_1_ITEMS, ...ROW_1_ITEMS];
const scrollingRow2 = [...ROW_2_ITEMS, ...ROW_2_ITEMS];

// The total width of the content when duplicated (40 items * 2)
const TOTAL_CONTENT_WIDTH = TOTAL_ITEMS * ITEM_WIDTH_PX;
// The distance the animation needs to travel to loop (half the total width)
const SCROLL_DISTANCE = -TOTAL_CONTENT_WIDTH;

// --- Component Definition ---
export default function ImageGallery() {

  const renderMediaItem = (media, index) => (
    <div
      key={index} // Use index as key here, as item content doesn't change
      className="relative inline-block w-64 h-64 mx-2 overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02] group"
      style={{ minWidth: '16rem' }} // Ensure a fixed width to stabilize scroll calculation
    >
      {media.isVideo ? (
        <video
          src={media.src}
          alt={media.alt}
          title={media.alt}
          width={500}
          height={500}
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
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={media.isPriority}
          loading={media.isPriority ? 'eager' : 'lazy'}
        />
      )}
      {media.isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
            ▶️
        </div>
      )}
    </div>
  );

  return (
    <section
      className="py-20 md:py-32 bg-gray-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-dancing text-primary-pink text-center mb-12">
          Our Favorite Moments
        </h2>
      </div>

      {/* Row 1: Left to Right Scroll */}
      <div className="relative w-full whitespace-nowrap overflow-hidden my-4 group">
        <motion.div
          initial={{ x: 0 }} // Start position
          animate={{ x: SCROLL_DISTANCE }} // Target position (scroll half the content)
          transition={{
            x: {
              repeat: Infinity,
              ease: "linear",
              duration: SCROLL_DURATION_S
            }
          }}
          className="inline-block"
          style={{ width: `${TOTAL_CONTENT_WIDTH * 2}px` }} // Double the total content width
        >
          {scrollingRow1.map(renderMediaItem)}
        </motion.div>

        {/* Fading overlay to blend edges */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-800 to-transparent via-transparent via-90% to-gray-800"></div>
      </div>

      {/* Row 2: Right to Left Scroll (Counter-Direction) */}
      <div className="relative w-full whitespace-nowrap overflow-hidden my-4 group">
        <motion.div
          initial={{ x: SCROLL_DISTANCE }} // Start at the end position (for reverse scroll)
          animate={{ x: 0 }} // Target position (back to the start)
          transition={{
            x: {
              repeat: Infinity,
              ease: "linear",
              duration: SCROLL_DURATION_S
            }
          }}
          className="inline-block"
          style={{ width: `${TOTAL_CONTENT_WIDTH * 2}px` }}
        >
          {scrollingRow2.map(renderMediaItem)}
        </motion.div>

        {/* Fading overlay to blend edges */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-800 to-transparent via-transparent via-90% to-gray-800"></div>
      </div>
    </section>
  );
}
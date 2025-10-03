'use client';
import { motion } from 'framer-motion';

const BIRTHDAY_QUOTES = [
  "You make every day feel like a celebration.",
  "Another year older, and you're still the only person who can make me smile that wide.",
  "May your day be as beautiful and bright as your heart.",
  "I'm so glad the universe made you mine. Happy Birthday!",
  "Cheers to the most wonderful person I know. I love you!",
  "Every moment with you is a gift. Today, the gift is all yours.",
  "My greatest wish is that all your wishes come true.",
  "Your light makes the world a better place. Happy Birthday, my love.",
  "You're not just a year older, you're a year more amazing.",
  "To the one who holds my heart—Happy Birthday!",
];

// Duplicate the quotes list to ensure a seamless, looping scroll
const scrollingQuotes = [...BIRTHDAY_QUOTES, ...BIRTHDAY_QUOTES];

const QUOTE_DURATION_S = 60; // Duration for the scroll loop
const QUOTE_CARD_WIDTH_PX = 450; // Increased to 450px for a good visible quote size

export default function QuotesScroller() {
  // We calculate width based on the desired quote card width
  const TOTAL_CONTENT_WIDTH = BIRTHDAY_QUOTES.length * QUOTE_CARD_WIDTH_PX;
  const SCROLL_DISTANCE = -TOTAL_CONTENT_WIDTH;

  return (
    <section className="py-12 bg-gray-900 overflow-hidden border-y border-primary-pink/30">
      <div className="relative w-full overflow-hidden"> {/* REMOVED: whitespace-nowrap */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: SCROLL_DISTANCE }}
          transition={{
            x: {
              repeat: Infinity,
              ease: "linear",
              duration: QUOTE_DURATION_S
            }
          }}
          className="flex flex-row" // ADDED: flex-row to arrange items horizontally
          style={{ width: `${TOTAL_CONTENT_WIDTH * 2}px` }}
        >
          {scrollingQuotes.map((quote, index) => (
            <div
              key={index}
              // CRITICAL: Use Flexbox on the container for vertical and horizontal centering
              className="flex items-center justify-center mx-4 p-6 text-center rounded-lg bg-gray-800/50 shadow-md text-3xl font-dancing italic text-secondary-gold/90 border border-secondary-gold/30"
              // Set a fixed width and height for a clean card size
              style={{
                minWidth: `${QUOTE_CARD_WIDTH_PX - 32}px`, // Fixed width
                height: '250px' // Fixed height for vertical centering reference
              }}
            >
              <p className="w-full break-words">{quote}</p> {/* Content wrapping enabled */}
            </div>
          ))}
        </motion.div>

        {/* Fading overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-900 via-transparent via-90% to-gray-900"></div>
      </div>
    </section>
  );
}
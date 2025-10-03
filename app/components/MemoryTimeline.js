'use client';
import { motion } from 'framer-motion';

const timelineData = [
  {
    date: '2022 - First Semester',
    title: 'The Beginning 🥂', // Shortened Title
    description: 'The day we met, stepping into our first year of study. From that moment, a quiet spark ignited. It was the start of an incredible journey together, and I knew immediately there was something truly special.',
    color: 'border-primary-pink',
  },
  {
    date: '2023 - Second Semester',
    title: 'Adventures of Fun 🛒', // Shortened Title
    description: "Remember those innocent, fun dates? We turned simple walks in supermarkets and random places into joyful little adventures. It wasn't about where we were, but the endless laughter and connection we found just by being together.",
    color: 'border-secondary-gold',
  },
  {
    date: '2023 - 2024',
    title: 'The Years of Resilience & Love 💖',
    description: "This time saw us navigate our deepest emotions. We built our relationship on consistency, spending precious moments together and cherishing the few dates we managed to sneak in. Through every challenge, we carried our dreams, but though we faced loss, we never lost hope — because we have each other. You showed me the true meaning of strength, and I am in awe of your heart. One day, our rainbow will come. Until then, I’m grateful every day for you.",
    color: 'border-primary-purple', // Highlight the important entry
    icon: '💖'
  },
  {
    date: 'Today: 6th October, Your Special Day!',
    title: 'Celebrating Your Light ✨',
    description: "Another year of loving you, learning from you, and being inspired by your endless capacity for kindness. This milestone is just one more reason to celebrate the brilliant, resilient, and beautiful person you are. I look forward to every single adventure the future holds for us. Happy Birthday!",
    color: 'border-primary-pink',
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function MemoryTimeline() {
  return (
    <section className="py-20 md:py-32 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-dancing text-primary-pink text-center mb-12">
          Our Journey Together
        </h2>

        <div className="relative border-l-4 border-primary-pink ml-4 md:ml-0">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden" // Ensure you set the initial state for Framer Motion
              whileInView="visible" // Animate when in view
              viewport={{ once: true, amount: 0.5 }} // Trigger only once when half visible
              variants={itemVariants}
              className="mb-8 flex items-start w-full relative pl-8 md:pl-16"
            >
              {/* Dot - You need to add the dot element itself */}
              <div
                className={`absolute left-[-22px] md:left-[-6px] top-1 h-4 w-4 rounded-full ${item.color.replace('border-', 'bg-')} ring-4 ring-gray-900 z-10`}
              >
                {item.icon && (
                    <span className="absolute -top-3 -left-3 text-xl">{item.icon}</span>
                )}
              </div>

              {/* Content Card */}
              <div className="p-6 bg-gray-800 rounded-lg shadow-xl w-full border-t-4" style={{ borderColor: item.color.replace('border-', '#') }}>
                <p className="text-sm text-gray-400 font-semibold mb-1">{item.date}</p>
                <h3 className="text-xl font-dancing font-bold text-primary-pink mb-2">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
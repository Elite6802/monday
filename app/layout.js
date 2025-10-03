import './globals.css';
import { Dancing_Script, Poppins } from 'next/font/google';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '600'],
});

export const metadata = {
  title: 'Happy Birthday, My Love! ❤️',
  description: 'A special surprise for your birthday.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* UPDATED: Changed bg-gray-50 to bg-gray-900 for dark mode */}
      <body
        className={`${dancingScript.variable} ${poppins.variable} font-poppins bg-gray-900 text-gray-200 antialiased`}
        suppressHydrationWarning={true} // <-- ADD THIS LINE
      >
        {children}
      </body>
    </html>
  );
}
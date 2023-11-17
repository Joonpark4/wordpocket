import type { Metadata } from 'next';
import './globals.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

export const metadata: Metadata = {
  title: 'Word Pocket',
  description: 'Wordpocket: An English-Korean Vocabulary Memorization App powered by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='flex w-screen h-screen justify-center items-center overflow-hidden'>
        <div className="flex flex-col w-screen min-w-[300px] max-w-[600px] h-screen min-h-[500px] max-h-[900px] justify-items-center items-center border-sky-500 border-2 rounded-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
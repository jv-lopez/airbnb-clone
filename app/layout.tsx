import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/navbar/Navbar';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'aribnb',
  description: 'Airbn clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}

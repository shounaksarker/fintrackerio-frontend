import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/next';
import MainLayout from '@/components/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fin-Tracker',
  description: 'Personal Finance',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" reverseOrder={false} />
        <MainLayout>{children}</MainLayout>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

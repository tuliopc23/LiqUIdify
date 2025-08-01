import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'liquidify';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiqUIdify Next.js Example',
  description: 'Example application showcasing LiqUIdify components in Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
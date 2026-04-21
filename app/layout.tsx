import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LPX Mobile Detailing',
  description: 'Premium mobile detailing at your location.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

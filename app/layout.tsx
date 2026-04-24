import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LPX Mobile Detailing',
  description: 'Mobile detailing for drivers across Upstate New York and the 518 area.'
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

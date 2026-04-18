import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Music Composition',
  description: 'Generate original music compositions with genre, mood, tempo, and instrument preferences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

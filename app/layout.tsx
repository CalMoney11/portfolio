import type { Metadata } from 'next';
import './globals.css'; // <-- Import the global styles here

// Define your app's metadata
export const metadata: Metadata = {
  title: 'Zuned Aalim | Full Stack Developer Portfolio',
  description: 'Portfolio of Zuned Aalim, a Full Stack Developer specializing in modern web solutions.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* The body applies the base styling from globals.css. 
        It's crucial for the Tailwind classes to work correctly.
      */}
      <body>
        {children}
      </body>
    </html>
  );
}
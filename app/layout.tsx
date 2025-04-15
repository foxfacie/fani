import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/layout/sidebar';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Fanmix - Your Digital Entertainment Hub',
  description: 'Connect with your favorite movies, shows, anime, books, and more',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#8A2BE2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="motion-safe">
      <head>
        <link rel="preconnect" href="https://i.imgur.com" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
      </head>
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 relative">
              <main className="h-screen overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
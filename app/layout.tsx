import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { siteConfig } from '@/lib/site';
import AuthProvider from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import Toast from '@/components/toast';

import Footer from './_components/Footer';
import Header from './_components/Header';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Church Finder PH',
    default: 'Church Finder PH',
  },
  description:
    'Find a biblical church in the Philippines where you will grow and know Christ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={siteConfig.font.sans.className}>
        <NextTopLoader color="#6d28d9" />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toast />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import AppProviders from '@/providers/AppProviders';
import NextTopLoader from 'nextjs-toploader';

import { siteConfig } from '@/lib/site';

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
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}

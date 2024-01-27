'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthProvider from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import Toast from '@/components/toast';

const queryClient = new QueryClient();

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default AppProviders;

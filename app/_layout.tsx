import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { Stack } from 'expo-router';
import { StyleSheet, Platform, useColorScheme } from 'react-native';

const queryClient = new QueryClient();

// Fix React Native Web dark mode error - must be done before any rendering
if (Platform.OS === 'web') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - StyleSheet.setFlag exists in React Native Web but not in types
  const webStyleSheet = StyleSheet as any;
  if (typeof webStyleSheet.setFlag === 'function') {
    webStyleSheet.setFlag('darkMode', 'class');
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Set dark mode class on document body for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = (global as any).document;
      if (colorScheme === 'dark') {
        doc.documentElement.classList.add('dark');
      } else {
        doc.documentElement.classList.remove('dark');
      }
    }
  }, [colorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack />
    </QueryClientProvider>
  );
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Global } from '@emotion/react';
import { globalStyle } from '@/styles/globalGlobal';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>
);

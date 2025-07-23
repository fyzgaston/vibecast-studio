import './styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import MusicApp from './MusicApp'
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from '@/shared/lib/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename='vibecast-studio'>
      <QueryClientProvider client={queryClient}>
        <MusicApp />
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
)

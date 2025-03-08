import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ReactQueryProvider } from '@/utils/query/ReactQueryProvider.tsx';

import { App } from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Router>
        <App />
      </Router>
    </ReactQueryProvider>
  </StrictMode>,
);

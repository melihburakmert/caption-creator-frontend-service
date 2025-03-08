import { RouteObject } from 'react-router-dom';

import { MainView } from '@/views/MainView.tsx';
import { SpotifyTokenExchangeView } from '@/views/SpotifyTokenExchangeView';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainView />,
  },
  {
    path: '/spotify-token-exchange',
    element: <SpotifyTokenExchangeView />,
  },
];

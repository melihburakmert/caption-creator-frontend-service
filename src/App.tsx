import { useRoutes } from 'react-router-dom';

import { routes } from '@/utils/routes';

import './App.css';

export const App = () => {
  const routing = useRoutes(routes);

  return <div>{routing}</div>;
};

import { Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';

export const routes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />
  }
];

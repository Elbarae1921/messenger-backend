import { Navigate } from 'react-router-dom';

import { Home } from '../ui/pages/Home';

interface Route {
  path: string;
  element: JSX.Element;
}

interface AppRoutes {
  public: Route[];
  private: Route[];
}

export const routes: AppRoutes = {
  public: [],
  private: [
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />
    }
  ]
};

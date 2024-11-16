import { Navigate } from 'react-router-dom';

import { Home } from '@/components/pages/home';
import { Login } from '@/components/pages/login';
import { Register } from '@/components/pages/register';

interface Route {
  path: string;
  element: JSX.Element;
}

interface AppRoutes {
  public: Route[];
  private: Route[];
}

export const routes: AppRoutes = {
  public: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ],
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

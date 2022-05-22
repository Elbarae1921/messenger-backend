import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Login } from '../ui/pages/Login';
import { routes } from './routes';

export const AppRouter = () => {
  const { user, loading } = useAuth();

  return (
    <Routes>
      {loading ? (
        <Route path="*" element={<div>Loading...</div>} />
      ) : user ? (
        routes.private.map(route => <Route key={route.path} {...route} />)
      ) : (
        <>
          {routes.public.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

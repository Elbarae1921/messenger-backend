import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { Login } from '../pages/Login';
import { routes } from './routes';

export const AppRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {user ? (
        routes.map(route => <Route key={route.path} {...route} />)
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

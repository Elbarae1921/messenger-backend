import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMeQuery } from '../api/generated';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (
      !data?.me?.id &&
      !loading &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      return navigate('/login');
    }
  }, [loading, data]);

  return { user: data?.me || null, loading };
};

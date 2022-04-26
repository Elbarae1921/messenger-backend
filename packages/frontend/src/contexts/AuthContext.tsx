import React, { createContext, ReactNode, useState } from 'react';

type AuthContextType = {
  login: () => void;
  logout: () => void;
  user: boolean;
};

const authContextDefaultValues: AuthContextType = {
  login: async () => {},
  logout: () => {},
  user: false
};

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

interface Props {
  children: ReactNode;
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }: Props) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<boolean>(false);

  const login = () => {
    setUser(true);
  };

  const register = () => {};

  const logout = () => {
    setUser(false);
  };

  // Return the user object and auth methods
  return {
    user,
    login,
    register,
    logout
  };
}

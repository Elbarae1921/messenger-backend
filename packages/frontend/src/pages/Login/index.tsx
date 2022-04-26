import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const { login } = useAuth();
  return (
    <>
      <h1>Login</h1>
      <button onClick={() => login()}>Login</button>
    </>
  );
};

import { useAuth } from '../../hooks/useAuth';

export const Home = () => {
  const { logout } = useAuth();
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hello world!</h1>
      <a className="link" href="/">
        Messenger
      </a>
      <p>Coming soon</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

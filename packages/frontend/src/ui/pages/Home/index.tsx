import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { MeDocument, useLogoutMutation } from '../../../api/generated';
import { Wrapper } from './style';

export const Home = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout({ refetchQueries: [{ query: MeDocument }], awaitRefetchQueries: true });
    await apolloClient.resetStore();
    navigate('/login');
  };

  return (
    <Wrapper>
      <h1>Hello world!</h1>
      <a className="link" href="/">
        Messenger
      </a>
      <p>Coming soon</p>
      <button onClick={handleLogout}>Logout</button>
    </Wrapper>
  );
};

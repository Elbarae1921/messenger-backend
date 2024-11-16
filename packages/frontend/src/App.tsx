import './index.css';

import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Toaster } from './components/ui/toaster';
import { AppRouter } from './router/AppRouter';
import { client } from './utils/apolloClient';

function App() {
  return (
    <>
      <Router>
        <ApolloProvider client={client}>
          <AppRouter />
          <Toaster />
        </ApolloProvider>
      </Router>
    </>
  );
}

export default App;

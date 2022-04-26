import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './router/AppRouter';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

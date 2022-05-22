import { BrowserRouter as Router } from 'react-router-dom';

import { AppProviders } from './AppProviders';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      <AppProviders>
        <Router>
          <AppRouter />
        </Router>
      </AppProviders>
    </>
  );
}

export default App;

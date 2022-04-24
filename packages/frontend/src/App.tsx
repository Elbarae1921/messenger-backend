import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ textAlign: 'center' }}>
        <h1>Hello world!</h1>
        <a className="link" href="/">
          Messenger
        </a>
        <p>Coming soon</p>
      </div>
    </>
  );
}

export default App;

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './theme';
import { client } from './utils/apolloClient';

interface Props {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
};

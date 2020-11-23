import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Footer from './Footer';

/* // eslint-disable-next-line
export default () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    hello
  </ThemeProvider>
) */

const QUERY = gql`
  {
    isLoggedIn @client
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

function App() {
  const { data: { isLoggedIn } } = useQuery(QUERY);

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Wrapper>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} />
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </div>
  )
}

export default App;
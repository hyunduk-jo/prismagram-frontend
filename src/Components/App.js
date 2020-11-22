import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

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

function App() {
  const { data: { isLoggedIn } } = useQuery(QUERY);

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} />
        </>
      </ThemeProvider>
    </div>
  )
}

export default App;
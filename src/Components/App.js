import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import Theme from '../Styles/Theme';
import AppRouter from './Router';

/* // eslint-disable-next-line
export default () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    hello
  </ThemeProvider>
) */

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <AppRouter isLoggedIn={false} />
        </>
      </ThemeProvider>
    </div>
  )
}

export default App;
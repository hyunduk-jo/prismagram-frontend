import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { HashRouter as Router } from 'react-router-dom';

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
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

function App() {
  const { data: { isLoggedIn } } = useQuery(QUERY);

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <Router>
            <>
              {isLoggedIn && <Header />}
              <Wrapper>
                <AppRouter isLoggedIn={isLoggedIn} />
                <Footer />
              </Wrapper>
            </>
          </Router>
          <ToastContainer position={toast.POSITION.TOP_LEFT} />
        </>
      </ThemeProvider>
    </div>
  )
}

export default App;
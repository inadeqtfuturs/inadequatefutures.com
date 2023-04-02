import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '@utils/globalStyles';
import { Layout } from '@components';
import { ThemeProvider } from '@context/ThemeContext';

function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

import React from 'react';
import PropTypes from 'prop-types';
import globalStyles from '@utils/globalStyles';
import { Layout } from '@components';


function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;

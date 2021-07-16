import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@stitches';
import Header from '@components/Header';
import Footer from '../Footer/Footer';

const LayoutWrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: 'min-content auto min-content',
  gridTemplateColumns: 'minmax(16px, 1fr) minmax(0, 780px) minmax(16px, 1fr)',
  minWidth: '320px',
  minHeight: '100vh',
  '& > header, & > main, & > footer': {
    gridColumn: 2,
    width: '100%',
    flexShrink: 0,
  },
  '& > main': {
    padding: '$6 0 0',
    margin: '0 0 auto',
  }
});

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </LayoutWrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;

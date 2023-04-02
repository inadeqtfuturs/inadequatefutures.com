import React from 'react';
import PropTypes from 'prop-types';
import { styled, darkTheme } from '@stitches';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Toggle from '@components/Toggle';

const LayoutWrapper = styled('div', {
  display: 'grid',
  gridTemplateRows: 'min-content auto min-content',
  gridTemplateColumns: '$template-columns',
  minWidth: '320px',
  minHeight: '100vh',
  '& > header, & > main, & > footer': {
    gridColumn: '2',
    width: '100%',
    flexShrink: 0,
    [`.${darkTheme} &`]: {
      '@xl': {
        borderRight: '$contentBorder',
        borderLeft: '$contentBorder'
      }
    }
  },
  '& > main': {
    padding: '$main',
    margin: '0 0 auto',
    height: '100%'
  },
});

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Toggle />
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
